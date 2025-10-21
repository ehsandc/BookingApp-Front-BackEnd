# BookingApp - Full Stack Application

A full-stack booking application built with Node.js/Express backend and React frontend.

## Project Structure

- **backEnd/**: Node.js/Express REST API with Prisma ORM, Sentry integration, and authentication
- **frontEnd/**: React SPA with React Router, property search, booking, and user dashboard features

## Local Development

### Backend Setup

```bash
cd backEnd
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontEnd
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

## Production Deployment

This application is configured for deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Key Changes for Production:

- Database: SQLite (local) → PostgreSQL (production)
- Environment-based API URLs
- CORS configuration for production domains
- Optimized build scripts

## Features

- User authentication (JWT-based)
- Property search and filtering
- Property details and booking
- User dashboard
- Host management
- Review system
- Responsive design

## Tech Stack

### Backend

- Node.js & Express
- Prisma ORM
- PostgreSQL (production) / SQLite (development)
- JWT Authentication
- Sentry Error Monitoring
- Winston Logging

### Frontend

- React 19
- React Router v7
- CSS3 with responsive design
- Environment-based configuration

## API Documentation

The API includes endpoints for:

- `/users` - User management
- `/hosts` - Host management
- `/properties` - Property listings
- `/bookings` - Booking management
- `/reviews` - Review system
- `/login` - Authentication

## Testing

### Backend

```bash
cd backEnd
npm test  # Runs Vitest unit tests and Newman API tests
```

### Frontend

```bash
cd frontEnd
npm test  # Runs React testing library tests
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://... (or file:./dev.db for local)
AUTH_SECRET_KEY=your_secret_key
SENTRY_DSN=your_sentry_dsn (optional)
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001 (for CORS)
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:3000 (local) or https://your-api.onrender.com (production)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
# Deployment trigger - Tue Oct 21 15:12:46 CEST 2025
