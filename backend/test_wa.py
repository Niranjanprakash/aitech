import os
import time
from dotenv import load_dotenv
from twilio.rest import Client

load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID").strip()
auth_token = os.getenv("TWILIO_AUTH_TOKEN").strip()
from_whatsapp = os.getenv("TWILIO_WHATSAPP_FROM").strip()
to_whatsapp = os.getenv("TWILIO_WHATSAPP_TO").strip()

print("Testing WhatsApp...")
print(f"From: {from_whatsapp}")
print(f"To: {to_whatsapp}\n")

client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Test from AITechPulze",
    from_=from_whatsapp,
    to=to_whatsapp
)

print(f"Sent! SID: {message.sid}")
print(f"Status: {message.status}")

print("\nWaiting 5 seconds...")
time.sleep(5)

updated = client.messages(message.sid).fetch()
print(f"Final Status: {updated.status}")

if updated.status == "failed":
    print(f"Error: {updated.error_message}")
elif updated.status == "undelivered":
    print("\nSandbox not activated!")
    print("Send 'join <code>' to +14155238886")
else:
    print("Check WhatsApp!")
