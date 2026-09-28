# Pointify VPS Deployment Guide

## Overview

This guide walks you through deploying your Laravel + Inertia (React) project to a 2 vCPU / 2 GB RAM VPS using GitHub Actions for CI/CD.

**Architecture:**
```
GitHub Push → GitHub Actions → SSH to VPS → Deploy
```

**Stack:**
- Ubuntu 22.04/24.04
- PHP 8.3 + FPM
- PostgreSQL
- Redis
- Nginx
- Node.js 20 + pnpm
- Supervisor (queue workers)

---

## Step 1: Server Setup (One-Time)

SSH into your VPS and run the setup script:

```bash
# Download and run the setup script
wget https://raw.githubusercontent.com/ssatriya/pointify/main/deploy/server-setup.sh
chmod +x server-setup.sh
sudo ./server-setup.sh
```

This installs all dependencies. After it completes, continue below.

---

## Step 2: Configure Nginx

```bash
# Copy the nginx config
sudo cp /var/www/pointify/deploy/nginx.conf /etc/nginx/sites-available/pointify

# Edit the config to set your domain
sudo nano /etc/nginx/sites-available/pointify
# Change: server_name your-domain.com;
# To your actual domain or IP

# Enable the site
sudo ln -sf /etc/nginx/sites-available/pointify /etc/nginx/sites-enabled/pointify
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 3: Configure Supervisor (Queue Workers)

```bash
# Copy supervisor config
sudo cp /var/www/pointify/deploy/supervisor-workers.conf /etc/supervisor/conf.d/

# Reload supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl status
```

---

## Step 4: Set Up GitHub Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Create these secrets:

| Secret Name | Value |
|---|---|
| `VPS_HOST` | Your VPS IP address |
| `VPS_USER` | `ubuntu` (or your SSH username) |
| `VPS_SSH_KEY` | Your SSH **private** key (the full content of `~/.ssh/id_rsa` or `id_ed25519`) |
| `VPS_ENV_FILE` | Your complete `.env` file content |
| `MAINTENANCE_SECRET` | A random string for maintenance mode bypass |

### How to get your SSH private key:

```bash
# On your local machine
cat ~/.ssh/id_ed25519
# or
cat ~/.ssh/id_rsa
```

Copy the entire content (including `-----BEGIN ... PRIVATE KEY-----`)

### How to create your .env file:

Copy your `.env.example` and update these values:

```env
APP_NAME=Pointify
APP_ENV=production
APP_KEY=  # Will be generated on first deploy
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=pointify
DB_USERNAME=pointify_user
DB_PASSWORD=your_secure_password

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
```

---

## Step 5: First Deploy

Push to `main` branch:

```bash
git add .
git commit -m "Fix deployment workflow"
git push origin main
```

The workflow will:
1. Clone the repo to `/var/www/pointify`
2. Install PHP dependencies
3. Build frontend assets with pnpm
4. Run migrations
5. Cache config/routes/views
6. Start queue workers

---

## Step 6: SSL Certificate (HTTPS)

```bash
sudo certbot --nginx -d your-domain.com
```

Certbot will automatically update your Nginx config and set up auto-renewal.

---

## Step 7: Verify

```bash
# Check all services are running
sudo systemctl status nginx php8.3-fpm postgresql redis-server supervisor

# Check queue workers
sudo supervisorctl status

# Check logs
tail -f /var/www/pointify/storage/logs/laravel.log
```

---

## Troubleshooting

### 502 Bad Gateway
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/php8.3-fpm.log
```

### Permission denied
```bash
sudo chown -R www-data:www-data /var/www/pointify/storage /var/www/pointify/bootstrap/cache
sudo chmod -R 775 /var/www/pointify/storage /var/www/pointify/bootstrap/cache
```

### Queue workers not running
```bash
sudo supervisorctl status
sudo supervisorctl restart all
```

### Maintenance mode stuck
```bash
cd /var/www/pointify
php artisan up
```

---

## File Structure

```
pointify/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── deploy/
│   ├── nginx.conf                  # Nginx site config
│   ├── supervisor-workers.conf     # Queue worker config
│   ├── server-setup.sh             # One-time server setup
│   └── SETUP-GUIDE.md              # This file
```
