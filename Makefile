.PHONY: init dev up down db-reset db-migrate db-generate help

help:
	@echo "🚀 Workout Cool Development Commands"
	@echo ""
	@echo "📦 Database Management:"
	@echo "  up          - Start PostgreSQL database using Docker Compose"
	@echo "  down        - Stop all Docker Compose services"
	@echo "  db-migrate  - Run Prisma migrations to update database schema"
	@echo "  db-generate - Generate Prisma client for type-safe database access"
	@echo "  db-reset    - Reset database (⚠️ Destructive! Drops all data)"
	@echo ""
	@echo "🛠️  Development:"
	@echo "  dev         - Start Next.js development server"
	@echo "  init        - Full setup: start DB, run migrations, and start dev server"
	@echo ""
	@echo "Usage: make <target>"
	@echo "Example: make init"

# Start Postgres with Docker Compose
up:
	docker compose up -d

# Stop Docker Compose
down:
	docker compose down

# Run Prisma migrations
db-migrate:
	npx prisma migrate deploy

# Generate Prisma client
db-generate:
	npx prisma generate

# Reset database (⚠️ destructive!)
db-reset:
	npx prisma migrate reset --force

# Start the dev server
dev:
	pnpm dev

# Initialize dev environment (start DB, run migration, start dev server)
init: up db-migrate dev
