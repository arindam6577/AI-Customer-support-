# n8n automation pack

Import the JSON files in n8n at `http://localhost:5678`. Each workflow calls the backend through an HTTP Request node and remains usable in mock mode. Set the webhook URL to `http://backend:4000` inside Docker or `http://localhost:4000` locally.

The workflows are intentionally modular: ingestion owns intake, classification owns AI output, assignment owns workload, and the scheduled workflows handle SLA, feedback, and reporting.