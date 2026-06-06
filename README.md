# Movie Ranking Poll

A small Next.js app for friends to rank a movie list. Voting uses one signed cookie per browser plus a required display name. When the poll is closed, the public page switches from the ballot to Ranked Pairs results.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

3. Set the environment variables:

   - `DATABASE_URL`: Neon Postgres connection string.
   - `ADMIN_PASSWORD`: password used on `/admin` to close or reopen the poll.
   - `COOKIE_SECRET`: long random string for signing voter cookies.

4. Initialize the database:

   ```bash
   npm run db:init
   ```

5. Start local development:

   ```bash
   npm run dev
   ```

## Movie List

Edit `src/lib/movies.ts` before sharing the poll. Keep each `id` stable and unique. If you change the list after ballots exist, reset the `ballots` table first because saved rankings reference movie ids.

Each movie can include optional learning fields shown directly on its ranking card: `year`, `director`, `runtimeMinutes`, `description`, `infoUrl`, `trailerUrl`, and `thumbnailUrl`.

## Vercel Deployment

1. Create or link a Vercel project.
2. Add Neon through the Vercel Marketplace or create a Neon free-tier database manually.
3. Add `DATABASE_URL`, `ADMIN_PASSWORD`, and `COOKIE_SECRET` to the Vercel project environment variables.
4. Deploy:

   ```bash
   vercel --prod
   ```

5. Run the database initialization once against production using the production `DATABASE_URL`, or run the SQL in `src/lib/schema.sql` from the Neon SQL editor.

## Admin

Visit `/admin`, enter `ADMIN_PASSWORD`, and close the poll. Once closed, `/` shows final results instead of the ballot. Reopening allows voting and editing again.

## Validation

```bash
npm run typecheck
npm test
npm run build
```
