# 🌐 Hostinger Frontend Deployment Guide

## Step 1: Build Frontend

Open PowerShell/Command Prompt:

```bash
cd C:\Users\NIRANJAN\Company\frontend
npm install
npm run build
```

Wait for build to complete. You'll see a `build/` folder created.

---

## Step 2: Prepare Files for Upload

After build completes, you need to upload these files from `frontend/build/` folder:

```
build/
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── images/
├── .htaccess
├── manifest.json
├── robots.txt
├── sitemap.xml
├── favicon.png
└── schema.json
```

---

## Step 3: Login to Hostinger

1. Go to: **https://hpanel.hostinger.com**
2. Login with your credentials
3. Click on your domain/website

---

## Step 4: Open File Manager

1. Click **"File Manager"** or **"Files"**
2. Navigate to **`public_html`** folder
   - If you have a subdomain, go to that folder instead
3. **Backup existing files** (download them first!)

---

## Step 5: Clear Old Files

Delete these old files from `public_html`:
- Old `index.html`
- Old `static/` folder
- Old JavaScript/CSS files

**Keep these if they exist:**
- `.htaccess` (we'll replace it)
- `cgi-bin/` folder
- Any email-related folders

---

## Step 6: Upload New Files

### Option A: Using File Manager Upload

1. Click **"Upload Files"** button
2. Select ALL files from `C:\Users\NIRANJAN\Company\frontend\build\`
3. Upload (may take 5-10 minutes)
4. Verify all files uploaded

### Option B: Using FTP (Faster for large files)

1. Download **FileZilla** (https://filezilla-project.org)
2. Get FTP credentials from Hostinger:
   - Go to: Files → FTP Accounts
   - Copy: Host, Username, Password, Port
3. Connect via FileZilla
4. Upload `build/` folder contents to `public_html`

---

## Step 7: Verify .htaccess File

Make sure `.htaccess` exists in `public_html` with this content:

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

If it doesn't exist, create it in File Manager:
1. Click "New File"
2. Name: `.htaccess`
3. Paste the content above
4. Save

---

## Step 8: Update Backend CORS

Go back to **Render Dashboard**:

1. Click your backend service
2. Go to **"Environment"**
3. Update `ALLOWED_ORIGINS`:
   ```
   https://aitechpulze.com,https://www.aitechpulze.com
   ```
4. Save (auto-redeploys)

---

## Step 9: Test Your Website

1. Open: **https://aitechpulze.com**
2. Check:
   - ✅ Website loads
   - ✅ All pages work
   - ✅ Images load
   - ✅ Navigation works
   - ✅ No console errors (F12)

3. Test form submission:
   - Go to "Get Quote" page
   - Fill form
   - Upload PDF
   - Submit
   - Check email and WhatsApp

---

## 🐛 Troubleshooting

### Website shows old version
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito mode
- Wait 5 minutes for CDN cache

### 404 on page refresh
- Check `.htaccess` exists
- Verify mod_rewrite is enabled (contact Hostinger support)

### API calls failing
- Check browser console (F12)
- Verify backend URL in `.env`
- Check CORS settings on Render

### Images not loading
- Verify `images/` folder uploaded
- Check file paths are correct
- Check file permissions (755)

---

## 📋 Quick Checklist

Before uploading:
- [ ] Backend deployed on Render
- [ ] Frontend `.env` updated with Render URL
- [ ] `npm run build` completed successfully
- [ ] Backup existing Hostinger files

During upload:
- [ ] All files from `build/` uploaded
- [ ] `.htaccess` file present
- [ ] File structure correct

After upload:
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Form submission works
- [ ] Email received
- [ ] WhatsApp received
- [ ] CORS updated on Render

---

## 🎯 File Structure on Hostinger

```
public_html/
├── index.html              ← Main file
├── .htaccess              ← React routing
├── static/
│   ├── css/
│   │   └── main.xxxxx.css
│   ├── js/
│   │   └── main.xxxxx.js
│   └── media/
├── images/
│   ├── adhvaya.png
│   ├── ecosystem.jpg
│   └── ...
├── manifest.json
├── robots.txt
├── sitemap.xml
├── favicon.png
└── schema.json
```

---

## 🔄 Future Updates

To update frontend:

1. Make changes in code
2. Run `npm run build`
3. Upload new `build/` contents to Hostinger
4. Clear cache

---

## ✅ Success!

Your website is now live at:
- **https://aitechpulze.com**

Backend API:
- **https://aitechpulze-backend.onrender.com**

All APIs working:
- ✅ Gmail notifications
- ✅ WhatsApp alerts
- ✅ PDF uploads
- ✅ Quote calculator

---

**Need help?** Contact Hostinger support or check browser console for errors.
