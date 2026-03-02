# 🚀 DEPLOY FRONTEND TO HOSTINGER - SIMPLE STEPS

## ✅ Step 1: Build Frontend

Double-click: **`build-for-hostinger.bat`**

Or run manually:
```bash
cd frontend
npm install
npm run build
```

Wait for build to complete (2-5 minutes).

---

## ✅ Step 2: Login to Hostinger

1. Go to: **https://hpanel.hostinger.com**
2. Login
3. Click your website
4. Click **"File Manager"**

---

## ✅ Step 3: Upload Files

1. Navigate to **`public_html`** folder
2. **Backup old files** (download them first!)
3. **Delete old files** (keep cgi-bin if exists)
4. Click **"Upload Files"**
5. Select ALL files from:
   ```
   C:\Users\NIRANJAN\Company\frontend\build\
   ```
6. Upload (wait 5-10 minutes)

---

## ✅ Step 4: Verify .htaccess

Make sure `.htaccess` file exists in `public_html`:

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

If missing, create it in File Manager.

---

## ✅ Step 5: Update Backend CORS

Go to **Render Dashboard**:

1. Click your backend service
2. Go to **"Environment"**
3. Edit `ALLOWED_ORIGINS`:
   ```
   https://aitechpulze.com,https://www.aitechpulze.com
   ```
4. Save

---

## ✅ Step 6: Test Website

1. Open: **https://aitechpulze.com**
2. Test all pages
3. Submit a test form
4. Check email and WhatsApp

---

## 🎯 Files to Upload

From `frontend/build/` folder, upload:

- ✅ index.html
- ✅ static/ (folder with CSS, JS)
- ✅ images/ (folder)
- ✅ .htaccess
- ✅ manifest.json
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ favicon.png
- ✅ schema.json

---

## 🐛 Common Issues

**Website shows old version?**
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito mode

**404 on page refresh?**
- Check `.htaccess` exists
- Contact Hostinger to enable mod_rewrite

**API not working?**
- Check browser console (F12)
- Verify CORS on Render
- Check backend URL in `.env`

---

## ✅ Done!

Your website is live at:
**https://aitechpulze.com**

Connected to backend:
**https://aitechpulze-backend.onrender.com**

All features working:
- ✅ Gmail notifications
- ✅ WhatsApp alerts
- ✅ PDF uploads
- ✅ Quote calculator

---

**Need detailed guide?** See `HOSTINGER_DEPLOYMENT.md`
