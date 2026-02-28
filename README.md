# AITechPulze Backend API

Backend API for AITechPulze project management system.

## 🚀 Features

- ✅ **Gmail API Integration** - Email notifications with PDF attachments
- ✅ **WhatsApp Notifications** - Instant alerts via Twilio
- ✅ **PDF Upload Support** - Secure file handling (max 10MB)
- ✅ **Quote Calculator** - Automatic project cost estimation
- ✅ **CORS Configured** - Ready for frontend integration
- ✅ **Production Ready** - Deployed on Render

## 📋 API Endpoints

### Health Check
```
GET /health
Response: {"success": true, "message": "API is running."}
```

### Submit Project Request
```
POST /submit-project
Content-Type: multipart/form-data

Required Fields:
- fullName: string
- phoneNumber: string (10-15 digits)
- gmailId: string (valid email)
- projectType: string
- projectDescription: string

Optional Fields:
- extras[]: array of strings
- projectPdf: file (PDF only, max 10MB)

Response: {"success": true, "message": "Request submitted successfully!"}
```

## 🔧 Environment Variables

Required environment variables for deployment:

```bash
# Flask Configuration
PORT=5000
MAX_UPLOAD_MB=10
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Gmail API (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@yourdomain.com

# WhatsApp API (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+919876543210
```

## 📦 Dependencies

- Flask 3.0.3 - Web framework
- flask-cors 5.0.0 - CORS support
- Werkzeug 3.0.3 - File handling
- python-dotenv 1.0.1 - Environment variables
- gunicorn 22.0.0 - Production server
- twilio 9.0.4 - WhatsApp API

## 🚀 Deployment on Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Update backend"
git push origin main
```

### Step 2: Create Web Service on Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `aitech`
4. Configure:
   - **Name**: aitechpulze-backend
   - **Region**: Singapore
   - **Branch**: main
   - **Root Directory**: backend
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT app:app --timeout 120`
   - **Plan**: Free

### Step 3: Add Environment Variables
Add all environment variables from `.env.example` with your actual values.

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

Your API will be available at: `https://aitechpulze-backend.onrender.com`

## 🧪 Testing

### Test Health Endpoint
```bash
curl https://aitechpulze-backend.onrender.com/health
```

### Test Form Submission
Use Postman or your frontend to submit a test request.

## 📝 Local Development

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

Server runs on: http://localhost:5000

## 🔐 Security

- Environment variables for sensitive data
- Secure filename handling
- File type validation
- File size limits
- CORS protection
- Input validation

## 📞 Support

For issues or questions, check the deployment guides:
- `RENDER_DEPLOYMENT.md` - Detailed deployment guide
- `API_VERIFICATION.md` - API testing guide
- `backend/.env.example` - Environment variables reference

## 📄 License

Private project for AITechPulze

---

**Backend URL**: https://aitechpulze-backend.onrender.com
**Repository**: https://github.com/Niranjanprakash/aitech
