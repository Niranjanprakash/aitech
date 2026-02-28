# ✅ CODE PUSHED TO GITHUB SUCCESSFULLY!

**Repository**: https://github.com/Niranjanprakash/aitech

---

## 🎯 NEXT STEPS - Deploy to Render

### Step 1: Get Your Credentials Ready

#### Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication first
3. Create app password for "Mail"
4. Copy the 16-character password
5. Save it: `____-____-____-____`

#### Twilio WhatsApp
1. Go to: https://console.twilio.com
2. Copy these values:
   - Account SID: `AC________________________________`
   - Auth Token: `________________________________`
3. Go to: Messaging → Try it out → Send a WhatsApp message
4. Follow instructions to activate sandbox
5. Your WhatsApp number: `whatsapp:+91__________`
6. Twilio sandbox number: `whatsapp:+14155238886`

---

### Step 2: Deploy Backend on Render

1. **Go to Render**
   - Visit: https://render.com
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub account
   - Select repository: `aitech`
   - Click "Connect"

3. **Configure Service**
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

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these ONE BY ONE:
   
   ```
   PORT = 5000
   MAX_UPLOAD_MB = 10
   ALLOWED_ORIGINS = https://yourdomain.com,https://www.yourdomain.com
   
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USE_TLS = true
   SMTP_USERNAME = your-email@gmail.com
   SMTP_PASSWORD = your-gmail-app-password-here
   ADMIN_EMAIL = admin@yourdomain.com
   
   TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN = your-twilio-auth-token
   TWILIO_WHATSAPP_FROM = whatsapp:+14155238886
   TWILIO_WHATSAPP_TO = whatsapp:+919876543210
   ```
   
   **IMPORTANT**: Replace with YOUR actual values!

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Your backend URL will be: `https://aitechpulze-backend.onrender.com`

6. **Test Backend**
   - Open: `https://aitechpulze-backend.onrender.com/health`
   - Should see: `{"success": true, "message": "API is running."}`

---

### Step 3: Update Frontend for Production

1. **Edit frontend/.env**
   ```
   REACT_APP_API_BASE_URL=https://aitechpulze-backend.onrender.com
   REACT_APP_SITE_URL=https://yourdomain.com
   REACT_APP_MAX_UPLOAD_MB=10
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. **Upload to Hostinger**
   - Login to Hostinger File Manager
   - Go to `public_html`
   - Upload ALL files from `frontend/build/` folder
   - Make sure `.htaccess` is uploaded

4. **Update CORS on Render**
   - Go back to Render Dashboard
   - Click your service → Environment
   - Update `ALLOWED_ORIGINS` with your actual domain
   - Save changes (auto-redeploys)

---

## 🧪 Testing

### Test Backend APIs

**Health Check**
```bash
curl https://aitechpulze-backend.onrender.com/health
```

**Test Form Submission**
1. Go to your website
2. Fill the "Get Quote" form
3. Upload a test PDF
4. Submit
5. Check:
   - ✅ Success message appears
   - ✅ Email received in admin inbox
   - ✅ WhatsApp notification received
   - ✅ PDF attachment in email

---

## 🔍 Verify All APIs Work

### Gmail API ✅
- Email should arrive in admin inbox
- PDF should be attached
- Quote calculation should be visible

### WhatsApp API ✅
- WhatsApp message should arrive
- Should include client details
- Should include quote estimate

### PDF Upload ✅
- Should accept PDF files up to 10MB
- Should reject non-PDF files
- Should attach to email

---

## 📊 Monitor Your Deployment

### Render Dashboard
- View logs: Dashboard → Your Service → Logs
- Check metrics: Dashboard → Metrics
- View environment variables: Dashboard → Environment

### Check Logs for Errors
```
Look for:
✅ "WhatsApp sent! SID: ..."
✅ "Email sent successfully"
❌ "SMTP Auth Error"
❌ "WhatsApp ERROR"
```

---

## 🚨 Common Issues & Solutions

### Email Not Sending
- ❌ Using regular Gmail password → ✅ Use App Password
- ❌ 2FA not enabled → ✅ Enable 2FA first
- ❌ Wrong SMTP settings → ✅ Use smtp.gmail.com:587

### WhatsApp Not Sending
- ❌ Sandbox not activated → ✅ Send test message to sandbox
- ❌ Wrong phone format → ✅ Use whatsapp:+919876543210
- ❌ No Twilio credits → ✅ Add credits to account

### CORS Errors
- ❌ Domain not in ALLOWED_ORIGINS → ✅ Add your domain
- ❌ Missing www version → ✅ Add both www and non-www
- ❌ Not redeployed → ✅ Save changes on Render

### 502 Bad Gateway
- ❌ Service sleeping → ✅ Wait 30 seconds, retry
- ❌ Missing env variables → ✅ Check all variables are set
- ❌ Build failed → ✅ Check Render logs

---

## 📝 Important URLs

- **GitHub Repo**: https://github.com/Niranjanprakash/aitech
- **Render Dashboard**: https://dashboard.render.com
- **Gmail App Passwords**: https://myaccount.google.com/apppasswords
- **Twilio Console**: https://console.twilio.com
- **Backend Health**: https://aitechpulze-backend.onrender.com/health

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Render service created
- [ ] All environment variables added
- [ ] Backend deployed successfully
- [ ] Health endpoint returns 200
- [ ] Frontend built and uploaded
- [ ] CORS updated with domain
- [ ] Test form submission works
- [ ] Email received with PDF
- [ ] WhatsApp notification received

---

## 📞 Need Help?

Check detailed guides:
- `DEPLOYMENT_COMPLETE.md` - Full deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `backend/.env.example` - Environment variables reference

---

**Your backend is ready! All APIs (Gmail + WhatsApp) are configured and will work once you add the environment variables on Render.**

Good luck! 🚀
