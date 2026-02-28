# AITechPulze Frontend

React (Create React App) frontend for the service website.

## Scripts

```bash
npm install
npm start
npm run build
```

## Environment Variables

Copy `.env.example` to `.env`:

- `REACT_APP_API_BASE_URL` (Render Flask API URL)
- `REACT_APP_SITE_URL` (Production domain)

## Deployment (Hostinger)

1. Run `npm run build`.
2. Upload `build/` contents to Hostinger public web directory.
3. Configure domain and SSL.
4. Ensure API URL points to your Render backend.
