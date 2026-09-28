#!/bin/bash
# ============================================
# Pointify VPS Setup Script (Ubuntu 22.04/24.04)
# Run as root or with sudo
# ============================================

export DEBIAN_FRONTEND=noninteractive
set -e

echo ">>> Installing system dependencies..."

# Add swap space (critical for 2GB RAM VPS)
if [ ! -f /swapfile ]; then
    echo ">>> Creating 2GB swap file..."
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
fi

# Update system
apt update && apt upgrade -y

# Install essential packages
apt install -y software-properties-common curl git unzip nginx ufw

# Add PHP 8.3 PPA (for Ubuntu 22.04)
add-apt-repository -y ppa:ondrej/php
apt update

# Install PHP 8.3 and extensions
apt install -y php8.3-fpm php8.3-cli php8.3-common php8.3-mbstring \
    php8.3-xml php8.3-curl php8.3-pgsql php8.3-zip php8.3-bcmath \
    php8.3-intl php8.3-opcache php8.3-readline php8.3-redis php8.3-gd

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Redis
apt install -y redis-server

# Install Node.js 20.x and pnpm
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pnpm

# Install Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx

echo ">>> Configuring PHP-FPM..."

# Update PHP-FPM settings for production
PHP_INI="/etc/php/8.3/fpm/php.ini"
sed -i 's/^memory_limit = .*/memory_limit = 256M/' $PHP_INI
sed -i 's/^upload_max_filesize = .*/upload_max_filesize = 50M/' $PHP_INI
sed -i 's/^post_max_size = .*/post_max_size = 50M/' $PHP_INI
sed -i 's/^max_execution_time = .*/max_execution_time = 300/' $PHP_INI

echo ">>> Configuring OPcache..."

cat > /etc/php/8.3/fpm/conf.d/10-opcache.ini << 'EOF'
zend_extension=opcache.so
opcache.enable=1
opcache.enable_cli=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.validate_timestamps=0
opcache.revalidate_freq=0
opcache.fast_shutdown=1
EOF

echo ">>> Creating deploy directory..."

mkdir -p /var/www
chown -R ubuntu:ubuntu /var/www

echo ">>> Configuring PostgreSQL..."

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE pointify;" 2>/dev/null || echo "Database may already exist"
sudo -u postgres psql -c "CREATE USER pointify_user WITH PASSWORD 'CHANGE_ME';" 2>/dev/null || echo "User may already exist"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE pointify TO pointify_user;" 2>/dev/null
sudo -u postgres psql -c "ALTER DATABASE pointify OWNER TO pointify_user;" 2>/dev/null

echo ">>> Configuring Nginx..."

# Copy nginx config (you'll need to adjust this)
# cp /path/to/nginx.conf /etc/nginx/sites-available/pointify
# ln -sf /etc/nginx/sites-available/pointify /etc/nginx/sites-enabled/pointify
# rm -f /etc/nginx/sites-enabled/default

echo ">>> Configuring UFW Firewall..."

ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

echo ">>> Installing Supervisor for queue workers..."

apt install -y supervisor

echo ">>> Enabling services..."

systemctl enable nginx
systemctl enable php8.3-fpm
systemctl enable postgresql
systemctl enable redis-server
systemctl enable supervisor

echo ""
echo "============================================"
echo "  Server setup complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Copy deploy/nginx.conf to /etc/nginx/sites-available/pointify"
echo "  2. Enable the site: ln -sf /etc/nginx/sites-available/pointify /etc/nginx/sites-enabled/"
echo "  3. Update the database password in your .env file"
echo "  4. Copy deploy/supervisor-workers.conf to /etc/supervisor/conf.d/"
echo "  5. Run: sudo supervisorctl reread && sudo supervisorctl update"
echo "  6. Run: sudo nginx -t && sudo systemctl reload nginx"
echo "  7. Get SSL: sudo certbot --nginx -d your-domain.com"
echo ""
echo "============================================"
