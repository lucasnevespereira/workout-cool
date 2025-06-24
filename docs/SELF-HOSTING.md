# Self-Hosting Workout-Cool

Deploy **Workout-Cool** on your own server using Docker. This guide provides two deployment options with step-by-step instructions.

---

## 📑 Table of Contents

- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
  - [Common Setup Steps](#common-setup-steps)
  - [Option 1: Docker Compose (All-in-One)](#option-1-docker-compose-all-in-one)
  - [Option 2: Docker Only (External Database)](#option-2-docker-only-external-database)
- [Management Commands](#️-management-commands)
- [Troubleshooting](#-troubleshooting)
- [Resources & Support](#-resources--support)

---

## 📋 Prerequisites

Before you begin, ensure your server meets these requirements:

- **Operating System**: Linux server or VPS (Ubuntu 20.04+ recommended)
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Git**: [Install Git](https://git-scm.com/downloads)
- **Basic Knowledge**: Familiarity with command line operations

---

## 🚀 Quick Start

### Common Setup Steps

These steps are required for both deployment options:

#### 1. Connect to Your Server

```bash
ssh your-user@your-server-ip
```

#### 2. Clone the Repository

```bash
mkdir -p ~/apps
cd ~/apps
git clone https://github.com/Snouzy/workout-cool.git
cd workout-cool
```

#### 3. Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

**Essential Environment Variables:**

```bash
# Application Configuration (Required for both options)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://your-server-ip:3000

# Optional: Seed sample data on first run
SEED_SAMPLE_DATA=true
```

#### 4. Customize Sample Data (Optional)

```bash
nano data/sample-exercises.csv
```

**📚 See [Exercise Database Import section in the README](../README.md#exercise-database-import).**

---

### Option 1: Docker Compose (All-in-One)

This option automatically sets up both the application and PostgreSQL database.

**Additional Environment Variables:**

```bash
# Database Configuration (Docker Compose)
POSTGRES_USER=my-user
POSTGRES_PASSWORD=my-password
POSTGRES_DB=workout-cool
DB_HOST=postgres
DB_PORT=5432

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}
```

**Deploy:**

```bash
docker compose up -d
```

**Access:**

Visit `http://your-server-ip:3000`

---

### Option 2: Docker Only (External Database)

Use this option if you have an existing PostgreSQL database.

**Additional Environment Variables:**

```bash
# Database Configuration (External Database)
DATABASE_URL=postgresql://username:password@your-db-host:5432/workout_cool
```

**Deploy:**

```bash
docker build -t workout-cool .
docker run -d --name workout-cool -p 3000:3000 --env-file .env workout-cool
```

**Access:**

Visit `http://your-server-ip:3000`

---

## 🛠️ Management Commands

### Docker Compose Commands

```bash
# Start/Stop services
docker compose up -d
docker compose down

# View logs
docker compose logs -f

# Update and restart
git pull
docker compose down
docker compose up -d --build
```

### Docker Commands

```bash
# Start/Stop container
docker start workout-cool
docker stop workout-cool

# View logs
docker logs -f workout-cool

# Update application
git pull
docker build -t workout-cool .
docker stop workout-cool
docker rm workout-cool
docker run -d --name workout-cool -p 3000:3000 --env-file .env workout-cool
```

---

## 🐛 Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check logs
docker compose logs workout_cool  # or docker logs workout-cool

# Verify environment variables using docker compose
docker compose exec workout_cool env | grep DATABASE_URL  # or docker exec workout-cool env | grep DATABASE_URL
```

#### Database Connection Issues
```bash
# Test database connectivity (Docker Compose)
docker compose exec postgres psql -U postgres -d workout_cool -c "SELECT 1;"

# Check database status
docker compose ps postgres
```

#### Port Already in Use
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Change port in docker-compose.yml
# ports:
#   - "3001:3000"  # Use port 3001 instead
```

### Getting Help

If you encounter issues:

1. **Check the logs**: Use `docker compose logs` or `docker logs`
2. **Verify configuration**: Ensure all environment variables are set correctly
3. **Database connectivity**: Test database connection manually
4. **Search existing issues** or create a new one on [GitHub](https://github.com/Snouzy/workout-cool/issues)
5. **Join our [Discord community](https://discord.gg/NtrsUBuHUB)** for support

---

## 📚 Resources & Support

### Documentation
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

### Community & Support
- **GitHub**: [Repository](https://github.com/Snouzy/workout-cool) | [Issues](https://github.com/Snouzy/workout-cool/issues)
- **Discord**: [Join our community](https://discord.gg/NtrsUBuHUB)

---

*Last updated: June 2025*