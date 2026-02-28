# 🚀 Complete Deployment Guide

## 📋 Prerequisites Checklist

### Gmail API Setup
1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
   - Use this as `SMTP_PASSWORD`

### Twilio WhatsApp Setup
1. Sign up at https://www.twilio.com
2. Get your Account SID and Auth Token from Console
3. Activate WhatsApp Sandbox:
   - Go to Messaging → Try it out → Send a WhatsApp message
   - Follow instructions to connect your WhatsApp
4. Note down:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_FROM` (e.g., whatsapp:+14155238886)
   - `TWILIO_WHATSAPP_TO` (your WhatsApp number with country code)

---

## 🔧 Backend Deployment on Render

### Step 1: Push to GitHub
```bash
cd C:\Users\NIRANJAN\Company
git add .
git commit -m "Initial commit - Backend ready for deployment"
git remote add origin https://github.com/Niranjanprakash/aitech.git
git push -u origin main
```

### Step 2: Create Render Web Service
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: aitechpulze-backend
   - **Region**: Singapore (or closest to you)
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT app:app --timeout 120`
   - **Plan**: Free

### Step 3: Add Environment Variables
In Render Dashboard → Environment:

```
PORT=5000
MAX_UPLOAD_MB=10
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=admin@yourdomain.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+919876543210
```

**Important**: Replace with your actual values!

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://aitechpulze-backend.onrender.com`

### Step 5: Test Backend
```bash
curl https://aitechpulze-backend.onrender.com/health
```
Should return: `{"success": true, "message": "API is running."}`

---

## 🌐 Frontend Deployment on Hostinger

### Step 1: Update Frontend Configuration
Edit `frontend/.env`:
```
REACT_APP_API_BASE_URL=https://aitechpulze-backend.onrender.com
REACT_APP_SITE_URL=https://yourdomain.com
REACT_APP_MAX_UPLOAD_MB=10
```

### Step 2: Build Frontend
```bash
cd frontend
npm install
npm run build
```

### Step 3: Upload to Hostinger
1. Login to Hostinger File Manager
2. Navigate to `public_html` (or your domain folder)
3. Delete existing files (backup first!)
4. Upload ALL contents from `frontend/build/` folder:
   - index.html
   - static/ folder
   - images/ folder
   - .htaccess
   - manifest.json
   - robots.txt
   - sitemap.xml
   - etc.

### Step 4: Verify .htaccess
Ensure this file exists in public_html:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Step 5: Update CORS on Backend
After getting your domain, update Render environment variable:
```
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## ✅ Testing Checklist

### Backend Tests
- [ ] Health endpoint: `GET /health`
- [ ] SMTP working (check Gmail app password)
- [ ] Twilio WhatsApp working (check sandbox activation)
- [ ] CORS headers present

### Frontend Tests
- [ ] Website loads correctly
- [ ] Form submission works
- [ ] PDF upload works (max 10MB)
- [ ] Success message appears
- [ ] Email received
- [ ] WhatsApp notification received

### Test Form Submission
1. Fill out project form on website
2. Upload a test PDF
3. Submit
4. Check:
   - Success message on website
   - Email in admin inbox
   - WhatsApp message received

---

## 🐛 Troubleshooting

### Backend Issues

**"SMTP Authentication Failed"**
- Verify Gmail App Password (not regular password)
- Check 2FA is enabled
- Regenerate app password if needed

**"WhatsApp not sending"**
- Verify Twilio sandbox is activated
- Check phone number format: `whatsapp:+919876543210`
- Ensure Twilio account has credits

**"CORS Error"**
- Add your domain to `ALLOWED_ORIGINS`
- Include both www and non-www versions
- Restart Render service after changes

**"502 Bad Gateway"**
- Check Render logs
- Verify all environment variables are set
- Check if service is sleeping (free tier)

### Frontend Issues

**"API call failed"**
- Verify `REACT_APP_API_BASE_URL` is correct
- Check backend is running
- Test backend health endpoint

**"404 on page refresh"**
- Ensure `.htaccess` is uploaded
- Check mod_rewrite is enabled on Hostinger

**"Form not submitting"**
- Open browser console (F12)
- Check for CORS errors
- Verify API endpoint URL

---

## 📊 Monitoring

### Render Dashboard
- View logs: Dashboard → Logs
- Check metrics: Dashboard → Metrics
- Monitor uptime

### Email Delivery
- Check spam folder
- Verify SMTP credentials
- Test with test_email.py locally first

### WhatsApp Delivery
- Check Twilio console logs
- Verify sandbox is active
- Test with test_whatsapp.py locally first

---

## 🔄 Updates & Maintenance

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render auto-deploys on push.

### Update Frontend
```bash
cd frontend
npm run build
# Upload build/ contents to Hostinger
```

---

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Check browser console (F12)
3. Verify all environment variables
4. Test APIs individually

**Backend URL**: https://aitechpulze-backend.onrender.com
**Frontend URL**: https://yourdomain.com

---

## 🎉 Success Indicators

✅ Backend health check returns 200
✅ Form submission returns success message
✅ Email arrives in admin inbox
✅ WhatsApp notification received
✅ PDF attachments work
✅ Quote calculation displays correctly

---

**Last Updated**: 2024
**Version**: 1.0
