# AITechPulze Backend - Deployment Guide

## 🚀 Deploy to Render

### Prerequisites
1. GitHub account with this repository
2. Render account (free tier works)
3. Gmail App Password
4. Twilio WhatsApp credentials

### Step 1: Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial commit - AITechPulze Backend"
git branch -M main
git remote add origin https://github.com/Niranjanprakash/aitechpulze-backend.git
git push -u origin main
```

### Step 2: Deploy on Render

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +"** → Select **"Web Service"**
3. **Connect GitHub Repository**: `aitechpulze-backend`
4. **Configure Service**:
   - **Name**: `aitechpulze-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free (or paid for better performance)

### Step 3: Set Environment Variables

In Render Dashboard → Your Service → Environment, add these variables:

#### Flask Configuration
```
PORT=5000
MAX_UPLOAD_MB=10
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

#### Gmail SMTP (Required)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

**Get Gmail App Password**:
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Search "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password

#### Twilio WhatsApp (Required)
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+91XXXXXXXXXX
```

**Get Twilio Credentials**:
1. Sign up at https://www.twilio.com/try-twilio
2. Get Account SID and Auth Token from Console
3. Activate WhatsApp Sandbox: Console → Messaging → Try it out → Send WhatsApp message
4. Use sandbox number as FROM, your number as TO

### Step 4: Deploy
- Click **"Create Web Service"**
- Wait 2-5 minutes for deployment
- Your API will be live at: `https://aitechpulze-backend.onrender.com`

### Step 5: Update Frontend

Update your frontend (Hostinger) to use the new backend URL:

```javascript
// In your frontend code
const API_URL = 'https://aitechpulze-backend.onrender.com';

// Example API call
fetch(`${API_URL}/submit-project`, {
  method: 'POST',
  body: formData
});
```

### Step 6: Test APIs

#### Health Check
```bash
curl https://aitechpulze-backend.onrender.com/health
```

#### Submit Project (Test)
```bash
curl -X POST https://aitechpulze-backend.onrender.com/submit-project \
  -F "fullName=Test User" \
  -F "phoneNumber=+919876543210" \
  -F "gmailId=test@example.com" \
  -F "projectType=Website Development" \
  -F "projectDescription=Test project" \
  -F "extras=SEO Optimization"
```

## 🔧 Important Notes

### CORS Configuration
Update `ALLOWED_ORIGINS` with your actual frontend domains:
```
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider paid plan ($7/month) for production

### Monitoring
- Check logs in Render Dashboard → Your Service → Logs
- Monitor email delivery and WhatsApp notifications
- Set up alerts for failures

## 📱 API Endpoints

### GET /health
Health check endpoint
- **Response**: `{"success": true, "message": "API is running."}`

### POST /submit-project
Submit project request with email and WhatsApp notification
- **Form Data**:
  - `fullName` (required)
  - `phoneNumber` (required)
  - `gmailId` (required)
  - `projectType` (required)
  - `projectDescription` (required)
  - `extras[]` (optional, multiple)
  - `projectPdf` (optional, PDF file)

## 🐛 Troubleshooting

### Email Not Sending
- Verify Gmail App Password (not regular password)
- Check 2-Step Verification is enabled
- Ensure SMTP credentials are correct in Render

### WhatsApp Not Working
- Verify Twilio credentials
- Check WhatsApp Sandbox is activated
- Confirm phone number format: `whatsapp:+[country][number]`
- Check Twilio Console for error messages

### CORS Errors
- Add frontend domain to `ALLOWED_ORIGINS`
- Include both www and non-www versions
- Use HTTPS in production

### 413 File Too Large
- Increase `MAX_UPLOAD_MB` in environment variables
- Default is 10MB

## 📞 Support
For issues, check:
1. Render logs
2. Twilio Console logs
3. Gmail account activity
