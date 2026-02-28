# AITechPulze Backend

Backend API for AITechPulze project submission system with email and WhatsApp notifications.

## 🚀 Features

- ✅ Project submission form handling
- ✅ Email notifications via Gmail SMTP
- ✅ WhatsApp notifications via Twilio
- ✅ PDF file upload support (max 10MB)
- ✅ Automatic quote calculation
- ✅ CORS enabled for frontend integration
- ✅ Input validation (phone, email)
- ✅ Production-ready with Gunicorn

## 📋 Prerequisites

- Python 3.11+
- Gmail account with App Password
- Twilio account with WhatsApp sandbox

## 🛠️ Local Setup

1. **Clone repository:**
```bash
git clone https://github.com/Niranjanprakash/aitechpulze-backend.git
cd aitechpulze-backend
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Create `.env` file:**
```env
PORT=5000
MAX_UPLOAD_MB=10
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@example.com

TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+91XXXXXXXXXX
```

4. **Run locally:**
```bash
python app.py
```

API will be available at: `http://localhost:5000`

## 🌐 API Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "API is running."
}
```

### POST /submit-project
Submit a new project request with email and WhatsApp notification.

**Form Data:**
- `fullName` (required) - Client's full name
- `phoneNumber` (required) - 10-15 digits with optional +
- `gmailId` (required) - Valid email address
- `projectType` (required) - Type of project
- `projectDescription` (required) - Project details
- `extras[]` (optional) - Array of additional features
- `projectPdf` (optional) - PDF file (max 10MB)

**Response:**
```json
{
  "success": true,
  "message": "✅ Request submitted successfully! Our team will contact you within 24 hours to discuss your project."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🚀 Deployment to Render

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy:**

1. Push to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy!

Your API will be live at: `https://aitechpulze-backend.onrender.com`

## 🔧 Configuration

### Gmail Setup
1. Enable 2-Step Verification in Google Account
2. Generate App Password: Account → Security → App passwords
3. Use the 16-character password in `SMTP_PASSWORD`

### Twilio WhatsApp Setup
1. Sign up at https://www.twilio.com
2. Get Account SID and Auth Token from Console
3. Activate WhatsApp Sandbox
4. Send test message to activate your number

### CORS Configuration
Update `ALLOWED_ORIGINS` with your frontend domains:
```
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 📦 Tech Stack

- **Framework:** Flask 3.0.3
- **WSGI Server:** Gunicorn 22.0.0
- **Email:** SMTP (Gmail)
- **WhatsApp:** Twilio 9.0.4
- **CORS:** Flask-CORS 5.0.0
- **Environment:** Python-dotenv 1.0.1

## 🧪 Testing

Test files included:
- `test_api.py` - API endpoint tests
- `test_email.py` - Email functionality tests
- `test_whatsapp.py` - WhatsApp notification tests

## 📝 License

MIT License - Feel free to use for your projects!

## 👨‍💻 Author

Niranjan Prakash
- GitHub: [@Niranjanprakash](https://github.com/Niranjanprakash)

## 🐛 Issues

Report issues at: https://github.com/Niranjanprakash/aitechpulze-backend/issues
