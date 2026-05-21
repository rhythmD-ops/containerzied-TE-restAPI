Production-Ready TypeScript API — Docker Setup
A TypeScript Express REST API containerized with Docker, using Postgres for persistent storage and Redis for caching. The entire stack runs with a single docker compose up command.
Stack

App — TypeScript + Express, compiled via multistage Docker build
Database — Postgres 15 with a named volume for data persistence
Cache — Redis with a named volume for data persistence

Docker Highlights

Multistage Dockerfile — TypeScript compiler never makes it into the final image
Docker Compose — all three services start together, fully configured
Healthchecks — app waits for Postgres and Redis to be ready before starting
Named volumes — data survives container restarts
Environment variables — all secrets managed via .env file, never hardcoded
