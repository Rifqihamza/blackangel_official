# Black Angel Official Store

A modern e-commerce platform built with Next.js 16, TypeScript, and PostgreSQL.

## 🚀 Features

- **Admin Dashboard**: Complete product management system
- **Authentication**: Secure JWT-based authentication with role-based access
- **E-commerce Storefront**: Public product browsing and categorization
- **API**: RESTful API with comprehensive documentation
- **Security**: Rate limiting, CSRF protection, security headers
- **Performance**: Optimized queries, caching, monitoring
- **Backup**: Automated database backup system

## 🛡️ Security Features (Phase 1)

### ✅ Authentication & Authorization

- Unified NextAuth.js authentication system
- Role-based access control (ADMIN/USER)
- JWT token-based sessions
- Server-side session validation

### ✅ Rate Limiting

- Authentication endpoints: 5 attempts per 15 minutes
- API endpoints: 100 requests per minute
- Proper HTTP 429 responses with retry headers
- IP-based tracking

### ✅ Security Headers

- `X-Frame-Options: DENY` (prevents clickjacking)
- `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- CORS configuration with allowed origins

### ✅ CSRF Protection

- NextAuth.js built-in CSRF protection
- Middleware validation for suspicious headers
- Request sanitization

### ✅ Comprehensive Logging

- Structured logging with context
- Security event monitoring
- Performance metrics logging
- Admin action auditing

## ⚡ Performance Optimizations (Phase 2)

### ✅ Error Monitoring & Alerting

- Lightweight error aggregator (Sentry-compatible)
- React error boundary for frontend errors
- Performance monitoring for slow operations
- Database query performance tracking

### ✅ Database Backup Strategy

- Automated PostgreSQL backups with pg_dump
- Compression and retention policies
- Restore functionality
- Backup statistics and monitoring

### ✅ API Documentation

- Complete OpenAPI 3.0.3 specification
- Interactive API documentation
- Request/response examples
- Authentication documentation

### ✅ Performance Monitoring

- Response time tracking
- Memory usage monitoring
- Database query optimization with caching
- Image optimization utilities
- Virtual scrolling for large lists
- Bundle size optimization

### ✅ Load Testing

- Comprehensive load testing script
- Performance metrics collection
- Automated testing for different endpoints
- Performance assessment reports

## 📊 Production Monitoring

### Health Check Endpoints

- `GET /api/health` - Application health status
- `GET /api/monitoring/stats` - Error and performance statistics

### Logging

All logs include:

- Timestamp
- Request context (IP, user agent, path)
- User identification
- Performance metrics
- Error details with stack traces

## 🗄️ Database Backup

### Automated Backups

```bash
# Daily backups at midnight
# Retained for 30 days
# Compressed format for efficiency
```

### Manual Operations

```javascript
import { DatabaseBackup } from "@/lib/backup";

const backup = new DatabaseBackup({
  databaseUrl: process.env.DATABASE_URL,
  backupDir: "./backups",
  retentionDays: 30,
  compress: true,
});

// Create backup
await backup.createBackup();

// Restore from backup
await backup.restoreBackup("./backups/backup-2024-01-01.sql");
```

## 🧪 Load Testing

### Basic Usage

```bash
# Test products endpoint
node load-test.js /api/products 10 100

# Comprehensive test suite
node load-test.js comprehensive

# Custom endpoint testing
node load-test.js /api/categories 20 200
```

### Performance Metrics

- Response time percentiles (50th, 95th, 99th)
- Success/failure rates
- Requests per second
- Error categorization

## 🚀 Deployment

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/blackangel
DIRECT_URL=postgresql://username:password@localhost:5432/blackangel

# Authentication
NEXTAUTH_SECRET=your-super-secure-random-secret
NEXTAUTH_URL=https://yourdomain.com

# Security
ALLOWED_ORIGINS=https://yourdomain.com

# Monitoring (optional)
SENTRY_DSN=your-sentry-dsn-here
```

### Production Checklist

- [ ] Database backups configured
- [ ] SSL certificates installed
- [ ] Environment variables set
- [ ] Monitoring alerts configured
- [ ] Load testing completed
- [ ] Security headers verified
- [ ] Rate limiting tested

## 📚 API Documentation

Complete API documentation is available in `api-docs.json` following OpenAPI 3.0.3 specification.

### Key Endpoints

#### Public Endpoints

- `GET /api/products` - List products
- `GET /api/categories` - List categories
- `GET /api/products/[slug]` - Get product details

#### Admin Endpoints (Requires Authentication)

- `GET /api/admin/products` - List all products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

## 🔧 Development

### Setup

```bash
npm install
npm run dev
```

### Testing

```bash
# Load testing
node load-test.js comprehensive

# API documentation
# View api-docs.json for OpenAPI specification
```

### Database Operations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npm run prisma:seed
```

## 📈 Monitoring & Maintenance

### Daily Checks

- Review error logs
- Check backup status
- Monitor performance metrics
- Verify rate limiting effectiveness

### Weekly Maintenance

- Clean old backups
- Review security logs
- Update dependencies
- Performance optimization

### Monthly Reviews

- Security assessment
- Load testing
- Backup restoration testing
- Compliance checks

## 🤝 Contributing

1. Follow security best practices
2. Add tests for new features
3. Update API documentation
4. Run load tests before deployment
5. Review security implications

## 📄 License

This project is proprietary software for Black Angel Official Store.

---

**Built with ❤️ for Black Angel Official Store**
