# Deployment Guide for Render

This guide will help you deploy your full-stack booking application to Render.

## Prerequisites

1. Push your code to a GitHub repository
2. Sign up for a free Render account at [render.com](https://render.com)

## Deployment Steps

### 1. Deploy Backend (API)

1. **Create a Web Service on Render:**

   - Go to your Render dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository and branch

2. **Configure Backend Service:**

   ```
   Name: booking-app-backend (or your preferred name)
   Environment: Node
   Build Command: npm install && npm run postinstall
   Start Command: npm start
   ```

3. **Set Environment Variables:**
   In the Render dashboard, add these environment variables:

   ```
   NODE_ENV=production
   AUTH_SECRET_KEY=your_super_secret_jwt_key_here_change_this
   SENTRY_DSN=your_sentry_dsn_here (optional)
   ```

4. **Add PostgreSQL Database:**
   - In your Render dashboard, click "New +" → "PostgreSQL"
   - Choose a name like `booking-app-database`
   - After creation, copy the "External Database URL"
   - Add it as an environment variable in your web service:
     ```
     DATABASE_URL=your_postgres_url_from_render
     ```

### 2. Deploy Frontend

1. **Create a Static Site on Render:**

   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Select your repository and branch

2. **Configure Frontend Service:**

   ```
   Name: booking-app-frontend
   Build Command: cd frontEnd && npm install && npm run build
   Publish Directory: frontEnd/build
   ```

3. **Set Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-service-name.onrender.com
   ```
   (Replace with your actual backend URL from step 1)

### 3. Update CORS Configuration

After deployment, update your backend environment variables:

```
FRONTEND_URL=https://your-frontend-service-name.onrender.com
```

## Database Migration

Your database will be automatically set up when the backend deploys. The Prisma schema will create the necessary tables.

To seed the database with initial data:

1. Go to your backend service logs on Render
2. The seed script should run automatically on first deployment

## Important Notes

1. **Free Tier Limitations:**

   - Services may sleep after 15 minutes of inactivity
   - First request after sleeping takes longer to respond
   - Consider upgrading for production use

2. **Database:**

   - PostgreSQL is used instead of SQLite for production
   - Database URL is provided by Render automatically

3. **Environment Variables:**
   - Never commit `.env` files to Git
   - Use `.env.example` as templates
   - Set all required variables in Render dashboard

## Troubleshooting

1. **Build Failures:**

   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **API Connection Issues:**

   - Verify REACT_APP_API_URL is set correctly
   - Check CORS configuration in backend
   - Ensure backend service is running

3. **Database Issues:**
   - Verify DATABASE_URL environment variable
   - Check Prisma schema for any syntax errors
   - Review database connection logs

## Post-Deployment

1. Test all functionality:

   - User registration/login
   - Property browsing
   - Booking creation
   - Reviews

2. Monitor logs for any errors

3. Set up custom domains if needed (paid feature)

## Alternative: Docker Deployment (Optional)

If you prefer Docker deployment, you can create Dockerfiles:

### Backend Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
