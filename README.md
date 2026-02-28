# AITechPulze - Full Stack Project

## Project Structure
- **Backend**: Flask API (Deploy on Render)
- **Frontend**: React App (Deploy on Hostinger)

## Features
- ✅ Gmail API Integration (SMTP)
- ✅ WhatsApp Notifications (Twilio)
- ✅ PDF Upload Support
- ✅ Project Quote Calculator
- ✅ CORS Configured

## Backend Deployment (Render)

### Prerequisites
1. Render account
2. Gmail App Password
3. Twilio WhatsApp credentials

### Steps
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables (see below)
5. Deploy

### Required Environment Variables on Render
```
PORT=5000
MAX_UPLOAD_MB=10
ALLOWED_ORIGINS=https://yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@example.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+1234567890
```

## Frontend Deployment (Hostinger)

### Steps
1. Update `REACT_APP_API_BASE_URL` in frontend/.env
2. Build: `npm run build`
3. Upload `build/` folder contents to Hostinger public_html
4. Ensure `.htaccess` is uploaded for React routing

## Local Development

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints
- `GET /health` - Health check
- `POST /submit-project` - Submit project request

## Support
Contact: admin@aitechpulze.com
