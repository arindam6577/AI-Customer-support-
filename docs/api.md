# API surface

Authenticated routes use `Authorization: Bearer <token>`. The main unauthenticated intake route is `POST /api/tickets`; n8n can use `POST /webhooks/n8n/ticket` for an accepted webhook handoff.

Core resources include `/api/auth`, `/api/tickets`, `/api/agents`, `/api/teams`, `/api/customers`, `/api/feedback`, `/api/analytics/overview`, and `/api/automation/status`.