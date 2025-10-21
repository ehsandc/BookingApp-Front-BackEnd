# Copilot Instructions for BookingApp-localy

## Project Overview

This monorepo contains a full-stack booking application with two main components:

- **backEnd/**: Node.js/Express REST API with Prisma ORM (SQLite), Sentry integration, and Postman-based test automation.
- **frontEnd/**: React SPA using React Router, with a focus on property search, booking, and user dashboard features.

## Architecture & Data Flow

- **API Structure**: Each resource (users, hosts, properties, bookings, reviews) has its own Express router in `backEnd/src/routes/` and corresponding service in `backEnd/src/services/`.
- **Database**: Prisma models in `backEnd/prisma/schema.prisma` define Users, Hosts, Properties, Bookings, and Reviews. Relationships are enforced at the DB and API layers.
- **Frontend**: Components are organized by feature in `frontEnd/src/components/` and `frontEnd/src/pages/`. Context for authentication is in `frontEnd/src/context/AuthContext.js`.

## Developer Workflows

- **Backend**:
  - Install: `npm install` in `backEnd/`
  - Start (dev): `npm run dev` (uses nodemon)
  - Build DB client: `npm run build` (runs Prisma generate & db push)
  - Run tests: `npm test` (uses Vitest for unit tests, Newman for Postman collections)
  - Seed DB: `npx prisma db seed` (see `prisma/seed.js`)
  - Environment: Copy `.env` template from README, set `AUTH_SECRET_KEY` and `SENTRY_DSN` as needed.
- **Frontend**:
  - Install: `npm install` in `frontEnd/`
  - Start: `npm start`
  - Build: `npm run build`
  - Test: `npm test`

## Project-Specific Conventions

- **API URLs**: All backend endpoints are prefixed (e.g., `/users`, `/hosts`, `/properties`).
- **Error Handling**: Centralized in `backEnd/src/middleware/errorHandler.js`.
- **Logging**: Uses Winston, configured in `backEnd/src/middleware/logger.js`.
- **Authentication**: JWT-based, handled in `backEnd/src/middleware/auth.js` and `services/authService.js`.
- **Frontend Routing**: Uses React Router v7, see `frontEnd/src/components/Navigation.js` and `frontEnd/src/pages/`.
- **Data Mocks**: See `backEnd/src/data/` and `frontEnd/src/data/` for sample data and mock property listings.

## Integration & Testing

- **Postman/Newman**: API tests are in `backEnd/postman/collections/`. Use the `Local.postman_environment.json` for local runs. Update the base URL if running on a non-default port.
- **Prisma**: All DB changes require updating `schema.prisma` and running `npm run build` in `backEnd/`.
- **Environment Variables**: Sensitive keys must be set in `.env` (not committed).

## Examples

- To add a new API resource, create a new router in `src/routes/`, a service in `src/services/`, and update the main `src/index.js` to mount the route.
- To add a new frontend page, create a component in `src/pages/` and add a route in `src/components/Navigation.js`.

---

For more details, see the `README.md` files in each package. If you encounter unclear patterns or missing documentation, ask for clarification or propose updates here.
