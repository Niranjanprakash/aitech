# 🚀 Deploy Backend to Render - Step by Step

## Step 1: Push Code to GitHub

```bash
cd c:\Users\NIRANJAN\Company
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub

## Step 3: Create New Web Service

1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect" next to your GitHub repository
4. If repo not visible, click "Configure account" to grant access

## Step 4: Configure Service

**Basic Settings:**
- Name: `aitechpulze-backend`
- Region: `Singapore` (or closest to you)
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Python 3`

**Build & Deploy:**
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app`

**Instance Type:**
- Select: `Free` (or paid if needed)

## Step 5: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these one by one:

```
PORT = 10000
MAX_UPLOAD_MB = 10
ALLOWED_ORIGINS = https://yourdomain.com,http://localhost:3000

SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USE_TLS = true
SMTP_USERNAME = aitechpulze@gmail.com
SMTP_PASSWORD = wumwsieowihiazuy
ADMIN_EMAIL = aitechpulze@gmail.com

TWILIO_ACCOUNT_SID = your_twilio_account_sid
TWILIO_AUTH_TOKEN = your_twilio_auth_token
TWILIO_WHATSAPP_FROM = whatsapp:+14155238886
TWILIO_WHATSAPP_TO = whatsapp:+919585776088
```

## Step 6: Deploy

1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Watch the logs for any errors

## Step 7: Get Your Backend URL

Once deployed, you'll see:
```
https://aitechpulze-backend.onrender.com
```

Copy this URL!

## Step 8: Test Backend

Open browser and visit:
```
https://aitechpulze-backend.onrender.com/health
```

Should see:
```json
{"success": true, "message": "API is running."}
```

## Step 9: Update Frontend

Edit `frontend/.env`:
```
REACT_APP_API_BASE_URL=https://aitechpulze-backend.onrender.com
```

## Step 10: Build Frontend

```bash
cd frontend
npm run build
```

Upload `build/` folder contents to Hostinger.

---

## ⚠️ Important Notes

**Free Tier Limitations:**
- Sleeps after 15 min of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free

**To Keep Awake (Optional):**
Use a service like UptimeRobot to ping your API every 10 minutes.

**Update ALLOWED_ORIGINS:**
After deploying frontend, add your Hostinger domain to `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS = https://yourdomain.com,https://www.yourdomain.com
```

---

## 🔧 Troubleshooting

**Build Failed:**
- Check `requirements.txt` is in `backend/` folder
- Verify Python version compatibility

**App Crashed:**
- Check logs in Render dashboard
- Verify all environment variables are set
- Check `gunicorn` is in requirements.txt

**CORS Error:**
- Add your frontend domain to `ALLOWED_ORIGINS`
- Restart the service after updating env vars

**Email Not Sending:**
- Verify Gmail App Password (not regular password)
- Check SMTP credentials

---

## 📊 Monitor Your App

**Render Dashboard:**
- View logs: Click "Logs" tab
- Check metrics: CPU, Memory usage
- Manual deploy: Click "Manual Deploy" → "Deploy latest commit"

**Auto-Deploy:**
Render auto-deploys when you push to GitHub main branch.

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web service created
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Service deployed successfully
- [ ] `/health` endpoint working
- [ ] Frontend `.env` updated with backend URL
- [ ] Frontend built and uploaded to Hostinger
- [ ] Test form submission working
- [ ] Email notifications working
- [ ] WhatsApp notifications working

---

## 🎉 Done!

Your backend is now live on Render!

**Next:** Deploy frontend to Hostinger (see DEPLOYMENT_GUIDE.md)
