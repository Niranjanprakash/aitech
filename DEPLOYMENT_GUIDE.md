# Deployment Guide - AITechPulze

## 🎯 Overview
- **Frontend**: Hostinger (React)
- **Backend**: Render/Railway/PythonAnywhere (Flask)
- **APIs**: Gmail SMTP + Twilio WhatsApp

---

## 📦 BACKEND DEPLOYMENT (Flask)

### Option 1: Render.com (Recommended - Free Tier)

1. **Create Account**: https://render.com

2. **Create New Web Service**:
   - Connect GitHub repo
   - Root Directory: `backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

3. **Environment Variables** (Add in Render Dashboard):
```
PORT=10000
MAX_UPLOAD_MB=10
ALLOWED_ORIGINS=https://yourdomain.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=your-email@gmail.com

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+919585776088
```

4. **Deploy**: Click "Create Web Service"

5. **Get Backend URL**: `https://your-app.onrender.com`

---

### Option 2: Railway.app (Alternative)

1. **Create Account**: https://railway.app

2. **New Project** → **Deploy from GitHub**

3. **Settings**:
   - Root Directory: `backend`
   - Start Command: `gunicorn app:app`

4. **Add Environment Variables** (same as above)

5. **Deploy** → Get URL

---

## 🌐 FRONTEND DEPLOYMENT (Hostinger)

### Step 1: Build React App

```bash
cd frontend
npm install
npm run build
```

This creates a `build/` folder with static files.

### Step 2: Update API URL

Before building, update `.env` in frontend:

```env
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
REACT_APP_MAX_UPLOAD_MB=10
```

### Step 3: Upload to Hostinger

1. **Login to Hostinger** → File Manager

2. **Navigate to**: `public_html/`

3. **Upload all files from `build/` folder**:
   - index.html
   - static/ folder
   - All other files

4. **Create `.htaccess`** in `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable CORS
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## 📧 GMAIL API SETUP

### Step 1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification**

### Step 2: Create App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select App: **Mail**
3. Select Device: **Other (Custom name)** → "AITechPulze"
4. Click **Generate**
5. Copy the 16-character password
6. Use this in `SMTP_PASSWORD` environment variable

---

## 📱 TWILIO WHATSAPP SETUP

### Step 1: Create Twilio Account
1. Sign up: https://www.twilio.com/try-twilio
2. Verify your phone number

### Step 2: Get WhatsApp Sandbox
1. Go to: Console → Messaging → Try it out → Send a WhatsApp message
2. Send "join [your-code]" to +1 415 523 8886 from your WhatsApp
3. Get credentials:
   - **Account SID**: From Console Dashboard
   - **Auth Token**: From Console Dashboard
   - **From Number**: `whatsapp:+14155238886`
   - **To Number**: `whatsapp:+919585776088` (your number)

### Step 3: Production (Optional)
For production WhatsApp:
1. Request WhatsApp Business API access
2. Get approved number
3. Update `TWILIO_WHATSAPP_FROM` with your number

---

## 🔧 TESTING

### Test Backend API:
```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{"success": true, "message": "API is running."}
```

### Test Frontend:
1. Visit: https://yourdomain.com
2. Go to "Get Quote" page
3. Fill form and submit
4. Check:
   - Email received
   - WhatsApp notification received
   - Success toast appears

---

## 📝 DEPLOYMENT CHECKLIST

### Backend:
- [ ] Backend deployed on Render/Railway
- [ ] All environment variables added
- [ ] `/health` endpoint working
- [ ] CORS configured with frontend domain

### Frontend:
- [ ] `REACT_APP_API_BASE_URL` updated
- [ ] `npm run build` completed
- [ ] Files uploaded to Hostinger
- [ ] `.htaccess` configured
- [ ] Website loads correctly

### APIs:
- [ ] Gmail App Password generated
- [ ] SMTP credentials working
- [ ] Twilio account created
- [ ] WhatsApp sandbox joined
- [ ] Test email sent successfully
- [ ] Test WhatsApp sent successfully

---

## 🚨 TROUBLESHOOTING

### Issue: CORS Error
**Solution**: Add your frontend domain to `ALLOWED_ORIGINS` in backend env vars

### Issue: Email not sending
**Solution**: 
- Check Gmail App Password (not regular password)
- Enable "Less secure app access" if needed
- Check SMTP credentials

### Issue: WhatsApp not sending
**Solution**:
- Verify Twilio credentials
- Check WhatsApp sandbox is active
- Ensure phone number format: `whatsapp:+919585776088`

### Issue: 404 on page refresh
**Solution**: Check `.htaccess` file is uploaded and configured

### Issue: Build folder too large
**Solution**: 
- Remove source maps: Add `GENERATE_SOURCEMAP=false` to frontend `.env`
- Compress images in `public/images/`

---

## 🔄 UPDATE WORKFLOW

### Update Frontend:
```bash
cd frontend
npm run build
# Upload build/ contents to Hostinger
```

### Update Backend:
```bash
git add .
git commit -m "Update backend"
git push
# Render/Railway auto-deploys
```

---

## 💰 COST BREAKDOWN

- **Hostinger**: $2-5/month (shared hosting)
- **Render Backend**: Free tier (sleeps after 15 min inactivity)
- **Gmail API**: Free
- **Twilio WhatsApp Sandbox**: Free (production: ~$0.005/message)

**Total**: ~$2-5/month

---

## 🎉 DONE!

Your website is now live with:
✅ React frontend on Hostinger
✅ Flask backend on Render
✅ Email notifications via Gmail
✅ WhatsApp alerts via Twilio

**Live URLs**:
- Frontend: https://yourdomain.com
- Backend: https://your-app.onrender.com
