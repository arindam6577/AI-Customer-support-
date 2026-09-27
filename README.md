# Helio Support OS

AI Customer Support Automation Platform for ticket intake, triage, assignment, communication, SLA monitoring, escalation, feedback, and analytics.

## Run locally

1. Install Node.js 20+ and copy `.env.example` to `.env`.
2. Run `npm install`.
3. Run `npm run db:generate && npm run db:push && npm run db:seed`.
4. Run `npm run dev`.
5. Open `http://localhost:5173` and use `admin@support.local` / `demo1234`.

The default `AI_PROVIDER=mock` uses deterministic, validated rules so the complete experience works without credentials. For deployment, point `DATABASE_URL` at PostgreSQL and add an OpenAI adapter behind the same classification contract.

## Automation

`automation/n8n/workflows` contains nine modular workflows. Start n8n and PostgreSQL with `docker compose up -d`, then import the workflows from the n8n UI. See `automation/n8n/README.md`.

## Architecture

React/Vite frontend -> Express REST API -> Prisma data layer -> SQLite demo or PostgreSQL deployment. n8n invokes the same API over webhooks, which keeps automation replaceable and auditable.