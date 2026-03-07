# Architecture

## Overview

Workout.cool is a single Next.js application that serves two roles:

1. **Web application** - The frontend UI (pages, components, server actions)
2. **API server** - REST endpoints consumed by the mobile app (iOS/Android)

Both clients share the same PostgreSQL database and authentication system (BetterAuth).

```
                    This repository
    +-----------------------------------------+
    |                                         |
    |   +-------------+   +---------------+   |
    |   |  Web UI     |   |  API Routes   |   |
    |   |  (pages,    |   |  /api/...     |   |
    |   |   server    |   |               |   |
    |   |   actions)  |   |  Used by both |   |
    |   +------+------+   |  web & mobile |   |
    |          |           +-------+-------+   |
    |          |                   |           |
    |          +-------+  +--------+           |
    |                  v  v                    |
    |           +------+------+                |
    |           |  PostgreSQL |                |
    |           |  (Prisma)   |                |
    |           +-------------+                |
    +-----------------------------------------+
                       ^
                       | HTTP
              +--------+--------+
              |  Mobile App     |
              |  (Expo / React  |
              |   Native)       |
              +-----------------+
```

## Mobile App Integration

The workout.cool mobile app (React Native / Expo) communicates with this
Next.js app exclusively through the API routes under `app/api/`.

### Mobile-specific code in this repo

These files exist to support the mobile app and can be ignored by self-hosters:

**API routes:**
- `app/api/revenuecat/` - RevenueCat subscription sync and status (mobile in-app purchases)
- `app/api/webhooks/revenuecat/` - RevenueCat webhook handler
- `app/api/workout-sessions/sync/` - Offline session sync from mobile

**Shared utilities:**
- `src/shared/api/mobile-auth.ts` - Handles mobile session authentication (cookie workaround)
- `src/shared/api/mobile-cookie-utils.ts` - Fixes malformed cookies sent by Expo
- `src/shared/api/mobile-safe-actions.ts` - Server action client for mobile-compatible auth
- `src/shared/lib/revenuecat/` - RevenueCat API integration

**Database models (in `prisma/schema.prisma`):**
- `RevenueCatWebhookEvent` - Stores mobile webhook events
- `Subscription.revenueCatUserId` - Links subscriptions to RevenueCat
- `Platform` enum (`IOS`, `ANDROID`) - Tracks subscription platform
- `PaymentProcessor` enum (`REVENUECAT`, `APPLE_PAY`, `GOOGLE_PAY`) - Mobile payment processors

All mobile-specific models are marked with `[MOBILE]` comments in the schema.

## Billing System

The app supports multiple billing modes:

| Provider | Platform | Use case |
|----------|----------|----------|
| Stripe | Web | Web subscriptions via Stripe Checkout |
| RevenueCat | iOS / Android | Mobile in-app purchases |
| License keys | Self-hosted | License-based access for self-hosted instances |
| None | Self-hosted | Free / no billing (default for self-hosters) |

Self-hosters do not need to configure any billing provider. The billing-related
tables are created by migrations but remain empty unless configured.

## Environment Variables

Environment variables are validated in `src/env.ts` using `@t3-oss/env-nextjs`.
They are grouped by category with comments:

- **Core** (required): database, auth, app URL
- **Email / SMTP** (optional): transactional emails
- **Billing: Stripe** (optional): web subscriptions
- **Billing: RevenueCat** (optional): mobile in-app purchases
- **Analytics** (optional): OpenPanel, GA4
- **Ads** (optional): AdSense / Ezoic ad placements

For a minimal self-hosted setup, you only need the **Core** variables.

## Project Structure (Feature-Sliced Design)

```
src/
  app/          # Next.js pages, routes and layouts
  processes/    # Business flows (multi-feature)
  widgets/      # Composable UI with logic (Sidebar, Header)
  features/     # Business units (auth, workout-builder, programs)
  entities/     # Domain entities (user, exercise, workout)
  shared/       # Shared code (UI, lib, config, types, api)

app/api/        # REST API routes (consumed by web and mobile)
prisma/         # Database schema and migrations
```

Import rule: `shared` -> `entities` -> `features` -> `widgets` -> `app`
