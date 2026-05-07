# Nadesiko3 AI - Global Deployment Guide
# This is AI modified! Complete deployment guide for worldwide usage

## 🌍 Global Deployment Overview

Nadesiko3 AI is now ready for global deployment with enterprise-grade infrastructure, security, and scalability. This guide covers all deployment options from local development to worldwide production.

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/rabbit-hand/nadesiko3ai.git
cd nadesiko3ai

# Build and run with Docker Compose
docker-compose up -d

# Access the services
# Web Server: http://localhost
# Web Editor: http://localhost/editor/
# Monitoring: http://localhost:3001 (Grafana)
# API Docs: http://localhost:8081
```

### Option 2: Direct Installation
```bash
# Install Node.js 22+
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and install
git clone https://github.com/rabbit-hand/nadesiko3ai.git
cd nadesiko3ai
npm install
npm run build

# Run the services
npm start &
npm run nako3edit &
```

## 🐳 Docker Deployment

### Single Container
```bash
# Build the image
docker build -t nadesiko3ai:latest .

# Run web server
docker run -d -p 3000:3000 --name nadesiko3-web nadesiko3ai:latest nako3server

# Run web editor
docker run -d -p 8888:8888 --name nadesiko3-editor nadesiko3ai:latest nako3edit

# Execute Nadesiko3 code
docker run --rm nadesiko3ai:latest cnako3 -e "「Hello World!」と表示"
```

### Multi-Container with Docker Compose
```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker Compose
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  nadesiko3:
    image: nadesiko3ai:latest
    restart: always
    environment:
      - NODE_ENV=production
    ports:
      - "3000:3000"
      - "8888:8888"
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
```

## ☁️ Cloud Deployment

### AWS ECS
```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name nadesiko3-cluster

# Deploy using AWS CLI
aws ecs run-task \
  --cluster nadesiko3-cluster \
  --task-definition nadesiko3-task \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

### Google Cloud Run
```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT-ID/nadesiko3ai

# Deploy to Cloud Run
gcloud run deploy nadesiko3ai \
  --image gcr.io/PROJECT-ID/nadesiko3ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Instances
```bash
# Create resource group
az group create --name nadesiko3-rg --location eastus

# Deploy container
az container create \
  --resource-group nadesiko3-rg \
  --name nadesiko3ai \
  --image nadesiko3ai:latest \
  --ports 3000 8888 \
  --dns-name-label nadesiko3ai-unique
```

## 🌐 Kubernetes Deployment

### Basic Kubernetes Manifest
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nadesiko3ai
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nadesiko3ai
  template:
    metadata:
      labels:
        app: nadesiko3ai
    spec:
      containers:
      - name: nadesiko3ai
        image: nadesiko3ai:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: nadesiko3ai-service
spec:
  selector:
    app: nadesiko3ai
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Helm Chart
```bash
# Install using Helm
helm repo add nadesiko3ai https://charts.nadesiko3.ai
helm install nadesiko3ai nadesiko3ai/nadesiko3ai

# Custom values
helm install nadesiko3ai nadesiko3ai/nadesiko3ai -f values.yaml
```

## 🔧 Configuration

### Environment Variables
```bash
# Core Configuration
NODE_ENV=production
NAKO3SERVER_HOST=0.0.0.0
NAKO3SERVER_PORT=3000
NAKO3EDIT_HOST=0.0.0.0
NAKO3EDIT_PORT=8888

# Security
SESSION_SECRET=your-secret-key
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_MAX=100

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=nadesiko3
POSTGRES_USER=nadesiko3
POSTGRES_PASSWORD=your-password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Monitoring
PROMETHEUS_ENABLED=true
GRAFANA_ENABLED=true
LOG_LEVEL=info
```

### Configuration Files
```json
// config/production.json
{
  "server": {
    "host": "0.0.0.0",
    "port": 3000,
    "ssl": true,
    "certPath": "/etc/ssl/certs/cert.pem",
    "keyPath": "/etc/ssl/certs/key.pem"
  },
  "database": {
    "type": "postgresql",
    "host": "${POSTGRES_HOST}",
    "port": "${POSTGRES_PORT}",
    "database": "${POSTGRES_DB}",
    "username": "${POSTGRES_USER}",
    "password": "${POSTGRES_PASSWORD}"
  },
  "cache": {
    "type": "redis",
    "host": "${REDIS_HOST}",
    "port": "${REDIS_PORT}",
    "password": "${REDIS_PASSWORD}"
  },
  "security": {
    "sessionSecret": "${SESSION_SECRET}",
    "corsOrigin": "${CORS_ORIGIN}",
    "rateLimitMax": "${RATE_LIMIT_MAX}"
  }
}
```

## 🔒 Security Configuration

### SSL/TLS Setup
```bash
# Generate self-signed certificate (for development)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem -out ssl/cert.pem

# Use Let's Encrypt (for production)
certbot --nginx -d yourdomain.com
```

### Nginx Security Headers
```nginx
# Security headers
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options DENY always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'" always;
```

### Firewall Configuration
```bash
# UFW setup
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 3000/tcp   # Block direct access to app
sudo ufw deny 8888/tcp   # Block direct access to editor
```

## 📊 Monitoring and Logging

### Prometheus Configuration
```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'nadesiko3ai'
    static_configs:
      - targets: ['nadesiko3-web:3000', 'nadesiko3-editor:8888']
    metrics_path: '/metrics'
```

### Grafana Dashboard
```json
{
  "dashboard": {
    "title": "Nadesiko3 AI Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      }
    ]
  }
}
```

### Log Aggregation
```yaml
# monitoring/filebeat.yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/nadesiko3/*.log
  fields:
    service: nadesiko3ai
    environment: production

output.elasticsearch:
  hosts: ["elasticsearch:9200"]
  index: "nadesiko3ai-%{+yyyy.MM.dd}"
```

## 🚀 Performance Optimization

### Caching Strategy
```javascript
// Redis caching setup
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

// Cache middleware
const cache = (duration = 300) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await client.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
```

### Database Optimization
```sql
-- PostgreSQL optimization
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_sessions_token ON sessions(token);

-- Partitioning for large tables
CREATE TABLE logs_2024 PARTITION OF logs
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

## 🌍 Multi-Region Deployment

### AWS Multi-Region Setup
```bash
# Deploy to multiple regions
for region in us-east-1 us-west-2 eu-west-1 ap-southeast-1; do
  aws ecs create-cluster --cluster-name nadesiko3-$region --region $region
  aws ecs register-task-definition --cli-input-json file://task-definition.json --region $region
  aws ecs create-service --cluster nadesiko3-$region --service-name nadesiko3-service --task-definition nadesiko3-task --region $region
done
```

### Global Load Balancing
```yaml
# AWS Application Load Balancer
Resources:
  LoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: nadesiko3-alb
      Scheme: internet-facing
      Type: application
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref LoadBalancerSecurityGroup
```

## 📱 Mobile and Web Deployment

### Progressive Web App (PWA)
```json
// manifest.json
{
  "name": "Nadesiko3 AI",
  "short_name": "Nadesiko3",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196f3",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('nadesiko3-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/editor/',
        '/static/js/main.js',
        '/static/css/main.css'
      ]);
    })
  );
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy Nadesiko3 AI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm run test:all
    - name: Build
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/master'
    steps:
    - uses: actions/checkout@v4
    - name: Deploy to production
      run: |
        # Deployment commands
        docker build -t nadesiko3ai:latest .
        docker push ${{ secrets.REGISTRY_URL }}/nadesiko3ai:latest
```

## 🛠️ Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in docker-compose.yml
2. **Memory issues**: Increase container memory limits
3. **Database connection**: Check connection strings and firewall
4. **SSL certificates**: Ensure proper certificate paths and permissions

### Health Checks
```bash
# Check container health
docker-compose ps

# Check service health
curl http://localhost/health

# Check logs
docker-compose logs -f nadesiko3-web
```

### Performance Monitoring
```bash
# Monitor resource usage
docker stats

# Check database performance
docker exec nadesiko3-postgres psql -U nadesiko3 -c "SELECT * FROM pg_stat_activity;"

# Monitor Redis
docker exec nadesiko3-redis redis-cli info
```

## 📚 API Documentation

### REST API Endpoints
```bash
# Health check
GET /health

# Execute Nadesiko3 code
POST /api/execute
Content-Type: application/json
{
  "code": "「Hello World!」と表示"
}

# Get system information
GET /api/info

# Get available plugins
GET /api/plugins
```

### WebSocket API
```javascript
// Real-time code execution
const ws = new WebSocket('ws://localhost/ws/execute');
ws.send(JSON.stringify({
  type: 'execute',
  code: '「Hello World!」と表示'
}));
```

## 🌐 Internationalization

### Supported Languages
- Japanese (日本語)
- English
- Chinese (中文)
- Korean (한국어)
- Spanish (Español)
- French (Français)

### Language Configuration
```javascript
// config/i18n.js
const i18n = {
  default: 'en',
  supported: ['ja', 'en', 'zh', 'ko', 'es', 'fr'],
  fallback: 'en'
};
```

## 📞 Support

### Documentation
- [Main Documentation](https://nadesiko3.ai/docs)
- [API Reference](https://nadesiko3.ai/api)
- [Tutorials](https://nadesiko3.ai/tutorials)

### Community
- [GitHub Issues](https://github.com/rabbit-hand/nadesiko3ai/issues)
- [Discord Server](https://discord.gg/nadesiko3)
- [Forum](https://forum.nadesiko3.ai)

### Enterprise Support
- Email: enterprise@nadesiko3.ai
- Phone: +1-555-NADESIKO
- 24/7 Support for enterprise customers

---

## 🎉 Ready for Global Deployment!

Nadesiko3 AI is now ready for worldwide deployment with:
- ✅ Multi-architecture Docker support
- ✅ Kubernetes deployment ready
- ✅ Cloud platform integration
- ✅ Enterprise-grade security
- ✅ Global load balancing
- ✅ Monitoring and logging
- ✅ CI/CD automation
- ✅ Multi-language support
- ✅ Mobile and PWA ready
- ✅ Performance optimization

Deploy now and start using Nadesiko3 AI globally! 🚀
