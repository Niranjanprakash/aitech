# ✅ BACKEND READY FOR RENDER DEPLOYMENT

## 📦 What's Included

Your backend has ALL APIs configured:
- ✅ Gmail API (SMTP) - Email notifications
- ✅ WhatsApp API (Twilio) - Instant alerts  
- ✅ PDF Upload - Secure file handling
- ✅ Quote Calculator - Automatic pricing
- ✅ CORS - Frontend integration ready

## 🚀 Deploy Now (3 Steps)

### Step 1: Get Credentials

**Gmail App Password**
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2FA → Create app password
3. Copy: `xxxx-xxxx-xxxx-xxxx`

**Twilio WhatsApp**
1. Go to: https://console.twilio.com
2. Copy Account SID and Auth Token
3. Activate WhatsApp Sandbox
4. Note your WhatsApp number: `whatsapp:+91XXXXXXXXXX`

### Step 2: Deploy on Render

1. **Go to**: https://render.com
2. **Click**: "New +" → "Web Service"
3. **Connect**: GitHub repo `aitech`
4. **Configure**:
   ```
   Name: aitechpulze-backend
   Region: Singapore
   Branch: main
   Root Directory: backend
   Build: pip install -r requirements.txt
   Start: gunicorn --bind 0.0.0.0:$PORT app:app --timeout 120
   Plan: Free
   ```

5. **Add Environment Variables** (click "Advanced"):
   ```
   PORT=5000
   MAX_UPLOAD_MB=10
   ALLOWED_ORIGINS=https://yourdomain.com
   
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USE_TLS=true
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-gmail-app-password
   ADMIN_EMAIL=admin@yourdomain.com
   
   TWILIO_ACCOUNT_SID=ACxxxxx...
   TWILIO_AUTH_TOKEN=your-token
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   TWILIO_WHATSAPP_TO=whatsapp:+919876543210
   ```

6. **Click**: "Create Web Service"

### Step 3: Test

**Health Check**:
```
https://aitechpulze-backend.onrender.com/health
```

**Test Form**: Submit from your Hostinger frontend

---

## 📋 Environment Variables (Copy-Paste Template)

```bash
PORT=5000
MAX_UPLOAD_MB=10
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
ADMIN_EMAIL=admin@yourdomain.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+919876543210
```

**Replace with YOUR actual values!**

---

## 🔍 Verify Everything Works

After deployment:

1. ✅ Health endpoint returns 200
2. ✅ Submit form from frontend
3. ✅ Check email inbox (with PDF)
4. ✅ Check WhatsApp notification
5. ✅ Verify quote calculation

---

## 📞 Important Links

- **GitHub**: https://github.com/Niranjanprakash/aitech
- **Render**: https://dashboard.render.com
- **Gmail Setup**: https://myaccount.google.com/apppasswords
- **Twilio**: https://console.twilio.com

---

## 📚 Detailed Guides

- `RENDER_DEPLOYMENT.md` - Complete deployment guide
- `API_VERIFICATION.md` - API testing guide
- `backend/.env.example` - Environment variables reference

---

## 🎯 Repository Structure

```
aitech/
├── backend/              ← Deploy this folder on Render
│   ├── app.py           ← Main API (Gmail + WhatsApp)
│   ├── requirements.txt ← Dependencies
│   ├── .env.example     ← Environment template
│   └── render.yaml      ← Render config
├── frontend/            ← Ignored (deployed on Hostinger)
└── README.md            ← You are here
```

---

## ✅ Checklist

Before deploying:
- [ ] Gmail App Password ready
- [ ] Twilio credentials ready
- [ ] WhatsApp sandbox activated
- [ ] Hostinger domain known

During deployment:
- [ ] Render service created
- [ ] All environment variables added
- [ ] Root directory set to `backend`
- [ ] Build and start commands correct

After deployment:
- [ ] Health check works
- [ ] Form submission works
- [ ] Email received
- [ ] WhatsApp received
- [ ] CORS updated with domain

---

## 🚨 Common Issues

**Email not sending?**
→ Use Gmail App Password, not regular password

**WhatsApp not sending?**
→ Activate Twilio sandbox first

**CORS error?**
→ Add your Hostinger domain to ALLOWED_ORIGINS

**502 error?**
→ Service sleeping (free tier), wait 30 seconds

---

## 🎉 Success!

Once deployed, your backend URL will be:
```
https://aitechpulze-backend.onrender.com
```

Use this URL in your Hostinger frontend configuration.

**All APIs are included and ready to work!** 🚀

---

**Questions?** Check the detailed guides or Render logs for errors.
