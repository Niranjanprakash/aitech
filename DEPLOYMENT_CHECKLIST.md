# 🚀 Deployment Checklist

## Before You Start

### Gmail Setup
- [ ] Enable 2-Factor Authentication on Gmail
- [ ] Generate App Password (Security → App passwords)
- [ ] Save the 16-character password

### Twilio Setup
- [ ] Create Twilio account
- [ ] Get Account SID from Console
- [ ] Get Auth Token from Console
- [ ] Activate WhatsApp Sandbox
- [ ] Send test message to sandbox number
- [ ] Note your WhatsApp number with country code

---

## Step 1: Push to GitHub

```bash
cd C:\Users\NIRANJAN\Company
git add .
git commit -m "Initial commit - Ready for deployment"
git remote add origin https://github.com/Niranjanprakash/aitech.git
git push -u origin main
```

Or double-click: `push-to-github.bat`

**Verify**: Check https://github.com/Niranjanprakash/aitech

---

## Step 2: Deploy Backend on Render

1. **Create Web Service**
   - [ ] Go to https://render.com
   - [ ] Click "New +" → "Web Service"
   - [ ] Connect GitHub repository
   - [ ] Select `aitech` repository

2. **Configure Service**
   - [ ] Name: `aitechpulze-backend`
   - [ ] Region: Singapore
   - [ ] Branch: `main`
   - [ ] Root Directory: `backend`
   - [ ] Runtime: Python 3
   - [ ] Build Command: `pip install -r requirements.txt`
   - [ ] Start Command: `gunicorn --bind 0.0.0.0:$PORT app:app --timeout 120`
   - [ ] Plan: Free

3. **Add Environment Variables**
   Copy from `backend/.env.example` and fill with real values:
   
   - [ ] `PORT` = 5000
   - [ ] `MAX_UPLOAD_MB` = 10
   - [ ] `ALLOWED_ORIGINS` = https://yourdomain.com
   - [ ] `SMTP_HOST` = smtp.gmail.com
   - [ ] `SMTP_PORT` = 587
   - [ ] `SMTP_USE_TLS` = true
   - [ ] `SMTP_USERNAME` = your-email@gmail.com
   - [ ] `SMTP_PASSWORD` = your-gmail-app-password
   - [ ] `ADMIN_EMAIL` = admin@yourdomain.com
   - [ ] `TWILIO_ACCOUNT_SID` = ACxxxxx...
   - [ ] `TWILIO_AUTH_TOKEN` = your-token
   - [ ] `TWILIO_WHATSAPP_FROM` = whatsapp:+14155238886
   - [ ] `TWILIO_WHATSAPP_TO` = whatsapp:+919876543210

4. **Deploy**
   - [ ] Click "Create Web Service"
   - [ ] Wait 5-10 minutes
   - [ ] Note your URL: `https://aitechpulze-backend.onrender.com`

5. **Test Backend**
   - [ ] Visit: `https://aitechpulze-backend.onrender.com/health`
   - [ ] Should see: `{"success": true, "message": "API is running."}`

---

## Step 3: Deploy Frontend on Hostinger

1. **Update Configuration**
   - [ ] Edit `frontend/.env`
   - [ ] Set `REACT_APP_API_BASE_URL` to your Render URL
   - [ ] Set `REACT_APP_SITE_URL` to your domain

2. **Build Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```
   - [ ] Build completes successfully
   - [ ] `build/` folder created

3. **Upload to Hostinger**
   - [ ] Login to Hostinger File Manager
   - [ ] Navigate to `public_html`
   - [ ] Backup existing files
   - [ ] Delete old files
   - [ ] Upload ALL contents from `build/` folder
   - [ ] Verify `.htaccess` is uploaded

4. **Update CORS**
   - [ ] Go back to Render Dashboard
   - [ ] Update `ALLOWED_ORIGINS` with your actual domain
   - [ ] Example: `https://yourdomain.com,https://www.yourdomain.com`
   - [ ] Save and redeploy

---

## Step 4: Final Testing

### Backend Tests
- [ ] Health check works
- [ ] CORS headers present
- [ ] No errors in Render logs

### Frontend Tests
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] No console errors (F12)

### Integration Tests
- [ ] Fill project form
- [ ] Upload test PDF (< 10MB)
- [ ] Submit form
- [ ] See success message
- [ ] Check admin email inbox
- [ ] Check WhatsApp for notification
- [ ] Verify PDF attachment in email

---

## Troubleshooting

### Email Not Sending
- [ ] Verify Gmail App Password (not regular password)
- [ ] Check 2FA is enabled
- [ ] Check spam folder
- [ ] View Render logs for errors

### WhatsApp Not Sending
- [ ] Verify Twilio sandbox is active
- [ ] Check phone number format: `whatsapp:+919876543210`
- [ ] Check Twilio console for errors
- [ ] Ensure account has credits

### CORS Errors
- [ ] Add domain to `ALLOWED_ORIGINS`
- [ ] Include both www and non-www
- [ ] Restart Render service

### 502 Bad Gateway
- [ ] Check all environment variables are set
- [ ] View Render logs
- [ ] Service might be sleeping (free tier)

---

## Important URLs

- **GitHub**: https://github.com/Niranjanprakash/aitech
- **Render Dashboard**: https://dashboard.render.com
- **Backend URL**: https://aitechpulze-backend.onrender.com
- **Frontend URL**: https://yourdomain.com
- **Twilio Console**: https://console.twilio.com
- **Gmail App Passwords**: https://myaccount.google.com/apppasswords

---

## Quick Commands

### Push updates to GitHub
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Rebuild frontend
```bash
cd frontend
npm run build
```

### View Render logs
```bash
# In Render Dashboard → Your Service → Logs
```

---

## Success Criteria

✅ Backend health endpoint returns 200
✅ Form submission works
✅ Email received with PDF attachment
✅ WhatsApp notification received
✅ Quote calculation correct
✅ No CORS errors
✅ All pages load correctly

---

**Need Help?** Check `DEPLOYMENT_COMPLETE.md` for detailed guide.
