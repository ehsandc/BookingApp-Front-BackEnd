# Database Connection Fix

## The Problem
The error `Can't reach database server at dpg-d3rp23gdl3ps73fk6geg-a:5432` indicates an incorrect DATABASE_URL format.

## Correct DATABASE_URL Format

Your DATABASE_URL should look like this:
```
postgresql://username:password@dpg-abc123-a.oregon-postgres.render.com/database_name
```

**NOT like this:**
```
postgresql://username:password@dpg-abc123-a:5432/database_name
```

## How to Get the Correct URL

### Method 1: From Database Dashboard
1. Go to your PostgreSQL database in Render dashboard
2. Look for "Internal Database URL" 
3. Copy the **FULL URL** including `.render.com` domain
4. Use this exact URL as DATABASE_URL

### Method 2: Construct It Manually
If you see separate connection details, construct like this:
```
postgresql://[User]:[Password]@[Hostname].render.com/[Database]
```

Example:
- User: `bookingapp_user`
- Password: `abc123xyz789`
- Hostname: `dpg-d3rp23gdl3ps73fk6geg-a.oregon-postgres`
- Database: `bookingapp_database`

**Correct URL:**
```
postgresql://bookingapp_user:abc123xyz789@dpg-d3rp23gdl3ps73fk6geg-a.oregon-postgres.render.com/bookingapp_database
```

## Deployment Strategy Change

I've updated the deployment to:
1. **Build time**: Only generate Prisma client (no DB connection needed)
2. **Start time**: Connect to DB, run migrations, seed data, then start server

This is more reliable because the database is guaranteed to be ready when the app starts.

## Next Steps

1. **Update your DATABASE_URL** in Render environment variables with the correct format
2. **Redeploy** - the build should now succeed
3. **Data seeding** will happen when the app starts (more reliable)