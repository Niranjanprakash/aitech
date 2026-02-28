import os
import re
import smtplib
import tempfile
from email.message import EmailMessage
from pathlib import Path
from twilio.rest import Client

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

load_dotenv(override=True)

app = Flask(__name__)
max_upload_mb = int(os.getenv("MAX_UPLOAD_MB", "10"))
app.config["MAX_CONTENT_LENGTH"] = max_upload_mb * 1024 * 1024

ALLOWED_EXTENSIONS = {".pdf"}
PHONE_PATTERN = re.compile(r"^\+?\d{10,15}$")
EMAIL_PATTERN = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:3000,https://aitechpulze.com"
    ).split(",")
    if origin.strip()
]
cors_origins = allowed_origins if allowed_origins else "*"

CORS(app, resources={r"/submit-project": {"origins": cors_origins}})


def _is_valid_phone(value: str) -> bool:
    compact = re.sub(r"[\s()-]", "", value)
    return bool(PHONE_PATTERN.match(compact))


def _is_valid_email(value: str) -> bool:
    return bool(EMAIL_PATTERN.match(value))


def _cleanup_file(file_path: str | None) -> None:
    if file_path and os.path.exists(file_path):
        os.remove(file_path)


def _calculate_quote_estimate(
    project_type: str,
    selected_extras: list[str]
) -> dict:
    """Calculate estimated quote based on project requirements"""
    base_prices = {
        "AI / Machine Learning Project": 4500,
        "Website Development": 3000,
        "Full Stack Application": 4000,
        "Data Analytics Dashboard": 3500,
        "Hardware + Software Project": 6000,
        "Final Year Student Project": 2500,
        "Startup MVP": 4500
    }
    
    extra_prices = {
        "SEO Optimization": 200,
        "Payment Gateway Integration": 300,
        "Admin Dashboard": 400,
        "Mobile Responsive Design": 200,
        "API Integration": 300,
        "Cloud Deployment Setup": 250,
        "Database Integration": 300,
        "User Authentication": 250,
        "Email Notifications": 150
    }
    
    base_cost = base_prices.get(project_type, 3000)
    extras_cost = sum(extra_prices.get(e, 0) for e in selected_extras)
    
    total = base_cost + extras_cost
    
    max_cap = 10000 if project_type == "Hardware + Software Project" else 5000
    final_total = min(total, max_cap)
    
    return {
        "base": base_cost,
        "extras": extras_cost,
        "total": final_total
    }


def _send_whatsapp_notification(
    full_name: str,
    phone_number: str,
    project_type: str,
    selected_extras: list[str],
    project_description: str,
    attachment_path: str | None
) -> bool:
    """Send WhatsApp notification using Twilio"""
    try:
        account_sid = os.getenv("TWILIO_ACCOUNT_SID", "").strip()
        auth_token = os.getenv("TWILIO_AUTH_TOKEN", "").strip()
        from_whatsapp = os.getenv("TWILIO_WHATSAPP_FROM", "").strip()
        to_whatsapp = os.getenv("TWILIO_WHATSAPP_TO", "").strip()
        
        print(f"\n=== WhatsApp Config ===")
        print(f"Account SID: {account_sid[:10]}...")
        print(f"From: {from_whatsapp}")
        print(f"To: {to_whatsapp}")
        print(f"========================\n")
        
        if not all([account_sid, auth_token, from_whatsapp, to_whatsapp]):
            print("ERROR: Twilio WhatsApp not fully configured")
            return False
        
        client = Client(account_sid, auth_token)
        
        quote = _calculate_quote_estimate(project_type, selected_extras)
        
        extras_text = ", ".join(selected_extras) if selected_extras else "None"
        
        message_text = (
            f"🚨 *NEW PROJECT REQUEST* 🚨\n"
            f"{'='*35}\n\n"
            f"👤 *CLIENT*\n"
            f"Name: {full_name}\n"
            f"Phone: {phone_number}\n\n"
            f"💼 *PROJECT*\n"
            f"Type: {project_type}\n"
            f"Features: {extras_text}\n\n"
            f"📝 *DESCRIPTION*\n"
            f"{project_description[:150]}{'...' if len(project_description) > 150 else ''}\n\n"
            f"💰 *QUOTE*\n"
            f"Base: ₹{quote['base']:,}\n"
            f"Features: ₹{quote['extras']:,}\n"
            f"*TOTAL: ₹{quote['total']:,}*\n\n"
            f"{'='*35}\n"
            f"✉️ Check email for full details\n\n"
            f"_AITechPulze Auto-Notification_"
        )
        
        print(f"Sending WhatsApp to {to_whatsapp}...")
        
        message = client.messages.create(
            body=message_text,
            from_=from_whatsapp,
            to=to_whatsapp
        )
        
        print(f"WhatsApp sent! SID: {message.sid}")
        return True
    except Exception as e:
        print(f"\n❌ WhatsApp ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False


def _build_email_message(
    *,
    full_name: str,
    phone_number: str,
    gmail_id: str,
    project_type: str,
    selected_extras: list[str],
    project_description: str,
    smtp_username: str,
    admin_email: str,
    attachment_path: str | None,
    attachment_name: str | None,
) -> EmailMessage:
    message = EmailMessage()
    message["Subject"] = f"New Project Request | {project_type} | {full_name}"
    message["From"] = smtp_username
    message["To"] = admin_email
    message["Reply-To"] = gmail_id

    quote = _calculate_quote_estimate(project_type, selected_extras)

    body = (
        "New project request received from AITechPulze website.\n\n"
        f"Full Name: {full_name}\n"
        f"Phone Number: {phone_number}\n"
        f"Gmail ID: {gmail_id}\n"
        f"Project Type: {project_type}\n"
        f"Key Features: {', '.join(selected_extras) if selected_extras else 'Not specified'}\n\n"
        "Project Description:\n"
        f"{project_description}\n\n"
        "--- QUOTE BREAKDOWN ---\n"
        f"Base Cost: INR {quote['base']:,}\n"
        f"Features Cost: INR {quote['extras']:,}\n"
        f"\nTOTAL AMOUNT: INR {quote['total']:,}\n"
        "\n(Final quote may vary based on detailed requirements)\n"
    )

    message.set_content(body)

    if attachment_path and attachment_name:
        with open(attachment_path, "rb") as file_handle:
            message.add_attachment(
                file_handle.read(),
                maintype="application",
                subtype="pdf",
                filename=attachment_name,
            )

    return message


@app.get("/health")
def health() -> tuple:
    return jsonify({"success": True, "message": "API is running."}), 200


@app.post("/submit-project")
def submit_project() -> tuple:
    full_name = request.form.get("fullName", "").strip()
    phone_number = request.form.get("phoneNumber", "").strip()
    gmail_id = request.form.get("gmailId", "").strip()
    project_type = request.form.get("projectType", "").strip()
    project_description = request.form.get("projectDescription", "").strip()
    selected_extras = [item.strip() for item in request.form.getlist("extras") if item.strip()]

    required_fields = {
        "fullName": full_name,
        "phoneNumber": phone_number,
        "gmailId": gmail_id,
        "projectType": project_type,
        "projectDescription": project_description,
    }

    missing_fields = [field for field, value in required_fields.items() if not value]
    if missing_fields:
        return (
            jsonify(
                {
                    "success": False,
                    "message": f"Missing required fields: {', '.join(missing_fields)}",
                }
            ),
            400,
        )

    if not _is_valid_phone(phone_number):
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Invalid phone number format. Use 10-15 digits with optional country code (+).",
                }
            ),
            400,
        )

    if not _is_valid_email(gmail_id):
        return jsonify({"success": False, "message": "Invalid email format."}), 400

    uploaded_pdf = request.files.get("projectPdf")
    temp_file_path = None
    attachment_name = None

    try:
        if uploaded_pdf and uploaded_pdf.filename:
            attachment_name = secure_filename(uploaded_pdf.filename)
            if not attachment_name:
                return jsonify({"success": False, "message": "Invalid PDF filename."}), 400

            extension = Path(attachment_name).suffix.lower()
            if extension not in ALLOWED_EXTENSIONS:
                return jsonify({"success": False, "message": "Only PDF upload is allowed."}), 400

            with tempfile.NamedTemporaryFile(delete=False, suffix=extension) as temp_file:
                uploaded_pdf.save(temp_file.name)
                temp_file_path = temp_file.name

        smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        smtp_username = os.getenv("SMTP_USERNAME", "").strip()
        smtp_password = os.getenv("SMTP_PASSWORD", "").strip()
        admin_email = os.getenv("ADMIN_EMAIL", "").strip()

        if not smtp_username or not smtp_password or not admin_email:
            return (
                jsonify(
                    {
                        "success": False,
                        "message": "SMTP configuration error. Please contact administrator.",
                    }
                ),
                500,
            )

        message = _build_email_message(
            full_name=full_name,
            phone_number=phone_number,
            gmail_id=gmail_id,
            project_type=project_type,
            selected_extras=selected_extras,
            project_description=project_description,
            smtp_username=smtp_username,
            admin_email=admin_email,
            attachment_path=temp_file_path,
            attachment_name=attachment_name,
        )

        use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

        with smtplib.SMTP(host=smtp_host, port=smtp_port, timeout=10) as smtp_server:
            smtp_server.ehlo()
            if use_tls:
                smtp_server.starttls()
                smtp_server.ehlo()
            smtp_server.login(smtp_username, smtp_password)
            smtp_server.send_message(message)

        # Send WhatsApp notification (non-blocking, optional)
        try:
            whatsapp_sent = _send_whatsapp_notification(
                full_name=full_name,
                phone_number=phone_number,
                project_type=project_type,
                selected_extras=selected_extras,
                project_description=project_description,
                attachment_path=temp_file_path
            )
            if whatsapp_sent:
                print(f"✅ WhatsApp notification sent for {full_name}")
            else:
                print(f"⚠️ WhatsApp notification failed for {full_name} (email sent successfully)")
        except Exception as wa_error:
            print(f"⚠️ WhatsApp error (non-critical): {wa_error}")

        return (
            jsonify(
                {
                    "success": True,
                    "message": "✅ Request submitted successfully! Our team will contact you within 24 hours to discuss your project.",
                }
            ),
            200,
        )
    except smtplib.SMTPAuthenticationError as e:
        print(f"SMTP Auth Error: {e}")
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Email service authentication failed. Please try again later.",
                }
            ),
            500,
        )
    except smtplib.SMTPException as e:
        print(f"SMTP Error: {e}")
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Unable to send email right now. Please try again later.",
                }
            ),
            500,
        )
    except Exception as error:
        import traceback
        traceback.print_exc()
        debug_mode = os.getenv("FLASK_ENV", "").lower() == "development"
        response_payload = {
            "success": False,
            "message": "Server error while processing request.",
        }
        if debug_mode:
            response_payload["error"] = str(error)
        return (
            jsonify(response_payload),
            500,
        )
    finally:
        _cleanup_file(temp_file_path)


@app.errorhandler(413)
def file_too_large(_error):
    return (
        jsonify(
            {
                "success": False,
                "message": f"File too large. Maximum upload size is {max_upload_mb} MB.",
            }
        ),
        413,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
