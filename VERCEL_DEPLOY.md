# Vercel Deployment Guide

## Quick Deploy

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   
3. **Follow prompts**:
   - Link to existing project? **N** (first time)
   - Project name: `bookingapp-fullstack`
   - Directory: `./` (root)
   
4. **Set Environment Variables** (in Vercel dashboard):
   ```
   DATABASE_URL = postgresql://bookingapp_database_user:Hd1V09cDgdJzngkYZpTxBWMOW6MOjFG5@dpg-d3rp23gdl3ps73fk6geg-a.frankfurt-postgres.render.com/bookingapp_database
   
   AUTH_SECRET_KEY = [generate with: openssl rand -base64 32]
   REFRESH_TOKEN_SECRET = [generate with: openssl rand -base64 32]
   NODE_ENV = production
   PORT = 3000
   LOG_LEVEL = info
   ```

5. **Redeploy** after adding env vars:
   ```bash
   vercel --prod
   ```

## Via Vercel Dashboard (Easier)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import `BookingApp-Front-BackEnd` from GitHub
4. Configure:
   - **Framework Preset**: Other
   - **Build Command**: Leave default or use: `npm run build`
   - **Output Directory**: Leave default
   - **Install Command**: `npm install`
   
5. **Add Environment Variables** in dashboard
6. Click **"Deploy"**

## Environment Variables

Generate secure keys:
```bash
# For AUTH_SECRET_KEY
openssl rand -base64 32

# For REFRESH_TOKEN_SECRET  
openssl rand -base64 32
```

Add these in Vercel Dashboard → Project Settings → Environment Variables:
- `DATABASE_URL` - Your PostgreSQL connection string
- `AUTH_SECRET_KEY` - Generated secret
- `REFRESH_TOKEN_SECRET` - Generated secret
- `NODE_ENV` - production
- `PORT` - 3000
- `LOG_LEVEL` - info

## Seed Database

After deployment, visit:
```
https://your-app.vercel.app/admin/seed
```

This will populate the database with sample properties.

## Notes

- Vercel uses serverless functions for backend
- Database connections are pooled
- Cold starts may occur on first request
- Free tier includes 100GB bandwidth/month
- Custom domains available on free tier

## Troubleshooting

If backend routes don't work:
1. Check `vercel.json` routes configuration
2. Verify environment variables are set
3. Check Vercel function logs in dashboard
4. Ensure DATABASE_URL includes full hostname with `.render.com`
