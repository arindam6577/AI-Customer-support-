# Architecture

The backend owns business rules and persistence. AI classification is a provider boundary: `AI_PROVIDER=mock` applies deterministic keyword and sentiment rules, while a future OpenAI adapter can return the same Zod-validated shape. n8n orchestrates scheduled and channel-specific work through HTTP Request nodes instead of duplicating database logic.