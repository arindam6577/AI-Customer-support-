# Setup

Node.js 20+ is required. For a no-credential demo, use the `.env.example` defaults, run the Prisma setup commands, seed the database, and start both workspaces with `npm run dev`.

For the container path, run `docker compose up -d`, change `DATABASE_URL` to the PostgreSQL connection string, then run Prisma generate and push from the host. Add provider credentials only through environment variables.