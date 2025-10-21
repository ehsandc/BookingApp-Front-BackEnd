# Render Deployment Configuration

## Environment Variables Setup

To deploy this application on Render, you need to configure the following environment variables in your Render service dashboard:

### Required Environment Variables

1. **DATABASE_URL** 
   - Go to Render Dashboard → Create PostgreSQL Database (Free tier available)
   - Copy the Internal Database URL and use it here
   - Format: `postgresql://username:password@host:5432/database_name`

2. **AUTH_SECRET_KEY**
   - Generate a strong secret key for JWT tokens
   - Use: `openssl rand -base64 32` or any strong password generator
   - Example: `your_super_secret_jwt_key_change_this_in_production`

3. **REFRESH_TOKEN_SECRET**
   - Generate another strong secret key for refresh tokens
   - Use: `openssl rand -base64 32` or any strong password generator
   - Example: `your_refresh_token_secret_change_this_in_production`

4. **NODE_ENV**
   - Set to: `production`

5. **PORT**
   - Set to: `3000`

6. **LOG_LEVEL**
   - Set to: `info`

### Optional Environment Variables

7. **SENTRY_DSN** (Optional - for error monitoring)
   - Sign up at sentry.io and get your DSN
   - Leave blank if not using Sentry

8. **FRONTEND_URL** (Optional - for CORS configuration)
   - Set to your frontend URL if deploying separately
   - For monorepo deployment, this can be omitted

## Step-by-Step Render Setup

### 1. Create PostgreSQL Database
1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Choose Free tier
4. Name: `bookingapp-database`
5. Copy the "Internal Database URL" from the database info page

### 2. Configure Web Service Environment Variables
1. Go to your web service dashboard
2. Click "Environment" tab
3. Add each environment variable listed above
4. Use the Internal Database URL for DATABASE_URL

### 3. Manual Redeploy
After setting environment variables:
1. Go to "Manual Deploy" tab
2. Click "Deploy latest commit"

## Database Migration
The build process will automatically:
1. Generate Prisma client
2. Push database schema
3. Create all required tables

No manual migration needed!

## Build Settings
Your current settings should work:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## Troubleshooting
If build fails:
1. Check all environment variables are set
2. Verify DATABASE_URL format is correct
3. Check logs for specific error messages
4. Ensure PostgreSQL database is created and accessible