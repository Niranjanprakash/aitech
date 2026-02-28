# 🚀 Render Deployment Guide - Backend Only

## Overview

This repository contains ONLY the backend API. Frontend is deployed separately on Hostinger.

**Repository**: https://github.com/Niranjanprakash/aitech
**Backend Folder**: `/backend`

---

## 📋 Prerequisites

### 1. Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication
3. Create app password for "Mail"
4. Copy the 16-character password
5. Format: `xxxx-xxxx-xxxx-xxxx`

### 2. Twilio WhatsApp Credentials
1. Sign up at: https://www.twilio.com
2. Get from Console Dashboard:
   - Account SID (starts with AC)
   - Auth Token
3. Activate WhatsApp Sandbox:
   - Go to: Messaging → Try it out → Send a WhatsApp message
   - Send the code to the sandbox number
   - Your number is now connected
4. Note:
   - Sandbox number: `whatsapp:+14155238886`
   - Your WhatsApp: `whatsapp:+91XXXXXXXXXX`

---

## 🔧 Render Deployment Steps

### Step 1: Create Web Service

1. **Login to Render**
   - Go to: https://render.com
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Click "Connect account" to link GitHub
   - Select repository: `Niranjanprakash/aitech`
   - Click "Connect"

### Step 2: Configure Service

Fill in these settings:

```
Name: aitechpulze-backend
Region: Singapore (or closest to you)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: gunicorn --bind 0.0.0.0:$PORT app:app --timeout 120
Instance Type: Free
```

### Step 3: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these **ONE BY ONE** (replace with your actual values):

#### Flask Configuration
```
PORT = 5000
MAX_UPLOAD_MB = 10
ALLOWED_ORIGINS = https://yourdomain.com,https://www.yourdomain.com
```

#### Gmail API (SMTP)
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USE_TLS = true
SMTP_USERNAME = your-email@gmail.com
SMTP_PASSWORD = xxxx-xxxx-xxxx-xxxx
ADMIN_EMAIL = admin@yourdomain.com
```

#### WhatsApp API (Twilio)
```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = your_twilio_auth_token_here
TWILIO_WHATSAPP_FROM = whatsapp:+14155238886
TWILIO_WHATSAPP_TO = whatsapp:+919876543210
```

**IMPORTANT**: 
- Use YOUR actual Gmail App Password (not regular password)
- Use YOUR Twilio credentials from console
- Use YOUR WhatsApp number with country code
- Update ALLOWED_ORIGINS with your Hostinger domain

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Watch the logs for any errors
4. Your backend URL will be: `https://aitechpulze-backend.onrender.com`

---

## ✅ Verify Deployment

### 1. Test Health Endpoint

Open in browser or use curl:
```bash
https://aitechpulze-backend.onrender.com/health
```

Expected response:
```json
{"success": true, "message": "API is running."}
```

### 2. Check Render Logs

In Render Dashboard:
- Click your service
- Go to "Logs" tab
- Look for:
  ```
  ✅ Starting gunicorn
  ✅ Listening at: http://0.0.0.0:5000
  ✅ Worker booted
  ```

### 3. Test Form Submission

From your Hostinger frontend:
1. Fill the project form
2. Upload a test PDF
3. Submit
4. Check:
   - ✅ Success message appears
   - ✅ Email received in admin inbox
   - ✅ WhatsApp notification received
   - ✅ PDF attached to email

---

## 🔄 Update Backend

When you make changes to backend code:

```bash
cd C:\Users\NIRANJAN\Company
git add backend/
git commit -m "Update backend API"
git push origin main
```

Render will automatically redeploy!

---

## 🔍 Monitoring

### View Logs
```
Render Dashboard → Your Service → Logs
```

Look for:
- ✅ `WhatsApp sent! SID: ...` - WhatsApp working
- ✅ Email sent successfully - Gmail working
- ❌ `SMTP Auth Error` - Check Gmail password
- ❌ `WhatsApp ERROR` - Check Twilio credentials

### Check Metrics
```
Render Dashboard → Your Service → Metrics
```

Monitor:
- Response times
- Memory usage
- Request count
- Error rate

---

## 🐛 Troubleshooting

### Email Not Sending

**Error**: `SMTP Authentication Error`
- ✅ Use Gmail App Password (not regular password)
- ✅ Enable 2-Factor Authentication first
- ✅ Regenerate app password if needed
- ✅ Check SMTP_USERNAME is correct email

**Error**: `Connection timeout`
- ✅ Check SMTP_HOST = smtp.gmail.com
- ✅ Check SMTP_PORT = 587
- ✅ Check SMTP_USE_TLS = true

### WhatsApp Not Sending

**Error**: `Authentication failed`
- ✅ Check TWILIO_ACCOUNT_SID is correct
- ✅ Check TWILIO_AUTH_TOKEN is correct
- ✅ Verify credentials in Twilio Console

**Error**: `Invalid phone number`
- ✅ Use format: `whatsapp:+919876543210`
- ✅ Include country code
- ✅ No spaces or dashes

**Error**: `Sandbox not activated`
- ✅ Send test message to sandbox number
- ✅ Follow activation instructions
- ✅ Check Twilio Console for status

### CORS Errors

**Error**: `CORS policy blocked`
- ✅ Add your domain to ALLOWED_ORIGINS
- ✅ Include both www and non-www versions
- ✅ Format: `https://domain.com,https://www.domain.com`
- ✅ Save and redeploy on Render

### 502 Bad Gateway

**Cause**: Service sleeping (free tier)
- ✅ Wait 30 seconds and retry
- ✅ First request after sleep takes longer

**Cause**: Build failed
- ✅ Check Render logs for errors
- ✅ Verify all dependencies in requirements.txt
- ✅ Check Python version compatibility

**Cause**: Missing environment variables
- ✅ Verify all variables are set
- ✅ Check for typos in variable names
- ✅ Ensure no extra spaces in values

---

## 📊 Environment Variables Checklist

Before deploying, verify you have:

- [ ] PORT
- [ ] MAX_UPLOAD_MB
- [ ] ALLOWED_ORIGINS (with your Hostinger domain)
- [ ] SMTP_HOST
- [ ] SMTP_PORT
- [ ] SMTP_USE_TLS
- [ ] SMTP_USERNAME (your Gmail)
- [ ] SMTP_PASSWORD (Gmail App Password)
- [ ] ADMIN_EMAIL
- [ ] TWILIO_ACCOUNT_SID
- [ ] TWILIO_AUTH_TOKEN
- [ ] TWILIO_WHATSAPP_FROM
- [ ] TWILIO_WHATSAPP_TO

---

## 🎯 Success Indicators

✅ Health endpoint returns 200
✅ No errors in Render logs
✅ Form submission works from frontend
✅ Email received with PDF attachment
✅ WhatsApp notification received
✅ Quote calculation correct
✅ CORS headers present

---

## 📞 Important URLs

- **Render Dashboard**: https://dashboard.render.com
- **Backend Health**: https://aitechpulze-backend.onrender.com/health
- **GitHub Repo**: https://github.com/Niranjanprakash/aitech
- **Gmail App Passwords**: https://myaccount.google.com/apppasswords
- **Twilio Console**: https://console.twilio.com

---

## 🔐 Security Notes

- Never commit `.env` file
- Use environment variables for all secrets
- Keep Gmail App Password secure
- Rotate Twilio credentials periodically
- Monitor Render logs for suspicious activity

---

## 📝 Quick Reference

### Backend Structure
```
backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env.example       # Environment variables template
├── render.yaml        # Render configuration
├── runtime.txt        # Python version
└── Procfile          # Process configuration
```

### API Endpoints
```
GET  /health           # Health check
POST /submit-project   # Submit project request
```

### Dependencies
```
Flask==3.0.3           # Web framework
flask-cors==5.0.0      # CORS support
twilio==9.0.4          # WhatsApp API
gunicorn==22.0.0       # Production server
```

---

## 🎉 Deployment Complete!

Once deployed:
1. ✅ Backend API running on Render
2. ✅ Gmail API configured and working
3. ✅ WhatsApp notifications active
4. ✅ PDF upload functional
5. ✅ CORS configured for Hostinger frontend
6. ✅ Auto-deploy on git push

**Your backend is production-ready!** 🚀

---

**Need help?** Check `API_VERIFICATION.md` for detailed API testing.
