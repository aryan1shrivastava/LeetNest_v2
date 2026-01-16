# Database Migration Guide: LeetNest v1 → v2

## Option 1: Create New Database (Recommended) ✅

**Best for:**
- Fresh start with v2
- Testing v2 features without affecting v1
- Avoiding migration issues

**Steps:**
1. Create a new PostgreSQL database on Render
2. Use the new `DATABASE_URL` in your Render environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Start fresh with v2 data

---

## Option 2: Use Existing v1 Database (If you want to preserve data)

**Best for:**
- Preserving existing users, problems, and submissions
- Migrating data from v1 to v2

**⚠️ Important Considerations:**

### Check Schema Compatibility First

Before using the v1 database, verify:

1. **Does v1 have the same tables?**
   - User
   - Problem
   - Submission
   - TestCaseResult
   - ProblemSolved
   - Playlist
   - ProblemInPlaylist

2. **Are the column types compatible?**
   - v2 uses UUID strings for IDs
   - v2 uses JSONB for: examples, testcases, codeSnippets, referenceSolutions, sourceCode
   - v2 uses enums: UserRole, Difficulty

3. **Migration Strategy:**
   - If v1 schema is different, you'll need to:
     - Backup v1 database first
     - Run v2 migrations (may fail if tables exist)
     - May need to manually migrate data

### Steps to Use v1 Database:

1. **Backup First!**
   ```bash
   pg_dump your_v1_database_url > backup.sql
   ```

2. **Check if migrations will work:**
   ```bash
   # Set DATABASE_URL to v1 database
   export DATABASE_URL="your_v1_database_url"
   
   # Try to check migration status
   cd backend
   npx prisma migrate status
   ```

3. **If migrations show as "not applied":**
   - You can run: `npx prisma migrate deploy`
   - This will apply v2 migrations to v1 database
   - ⚠️ This will modify your v1 database structure!

4. **If tables already exist with different structure:**
   - You'll need to manually migrate data
   - Or create a new database and export/import data

---

## Recommended Approach

**For Production:**
- Create a **new database** for v2
- Keep v1 database running (if still in use)
- Migrate data manually if needed later

**For Testing:**
- Use the same v1 database if you want to test with existing data
- Make sure to backup first!

---

## Quick Decision Guide

**Create New DB if:**
- ✅ You want a clean start
- ✅ v1 and v2 have different schemas
- ✅ You're not sure about compatibility
- ✅ You want to test v2 independently

**Use Existing DB if:**
- ✅ v1 and v2 schemas are identical/compatible
- ✅ You need to preserve existing data
- ✅ You've verified migrations will work
- ✅ You have a backup ready

---

## Environment Variable Setup

Regardless of which option you choose, set this in Render:

```
DATABASE_URL=postgresql://user:password@host:port/database
```

For new database: Use the connection string from Render PostgreSQL
For existing database: Use your v1 database connection string
