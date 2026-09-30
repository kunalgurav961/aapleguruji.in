# Recommended Delivery Approach

## Goal

Turn the existing landing and registration prototype into a dependable, role-aware puja-booking product without replacing the established React feature structure or visual system.

## Guiding decisions

- Keep the separate React client and Express API for now; make the interface explicit before adding features.
- Treat authentication, authorization, and booking persistence as the first product slice.
- Use the existing feature folders, Redux Toolkit, React Hook Form, Tailwind, Axios, Express, and Mongoose rather than introducing overlapping libraries.
- Validate input on both client and server. The server is the authority for authentication, role permissions, availability, and booking state.
- Put environment-specific values in environment variables, not source code.

## Work plan

### 1. Stabilize the baseline

1. Add root-level onboarding documentation and an `.env.example` for the server.
2. Make `PORT` naming consistent, validate required configuration at startup, and fail loudly when MongoDB cannot connect.
3. Replace the client hard-coded API origin with `VITE_API_BASE_URL`; configure Axios with `withCredentials: true` only if cookie-based refresh remains the chosen strategy.
4. Resolve current lint errors before expanding UI behavior. Remove unused React imports, import `toast` where used, remove unused destructuring, and split route placeholder components from route data if needed.
5. Add basic automated checks: backend route/controller tests and frontend component/flow tests. Run lint and build in CI.

### 2. Complete authentication securely

1. Define a public user contract: `_id`, `fullName`, `email`, `role`, profile fields, and timestamps. Do not expose `passwordHash` or refresh tokens.
2. Extend the User schema to include intentionally collected registration data (`role`, `city`, `mobileNumber`, Pandit fields, consent flags) or move profile details into role-specific models.
3. Add server-side request validation (required fields, email, password policy, mobile number, accepted terms, role-specific fields) before database work.
4. Fix registration edge cases: check by email, handle Mongo duplicate-key errors, return `fullName`, and avoid storing arbitrary role values.
5. Add login, refresh, logout, and `GET /api/auth/me`. Hash or rotate refresh tokens rather than storing raw tokens; configure cookies with secure, same-site, expiry, and production settings.
6. Add auth middleware and role middleware. Correct the Redux key to `isAuthenticated`, centralize session hydration, and make protected routes redirect appropriately.

### 3. Build the booking vertical slice

1. Define models for `PujaService`, `PanditProfile`/availability, and `Booking` before connecting the UI.
2. Decide the booking lifecycle: draft → availability check → pending confirmation → confirmed → completed/cancelled.
3. Create endpoints for service listing, availability/muhurat query, booking creation, booking detail, and a user’s booking history.
4. Replace the current one-value booking slice with async thunks/query state: pending, success, failure, and server data.
5. Make the home quick form continue to a booking detail/availability screen. Add accessible inline validation and a clear no-availability state.
6. Implement the Bookings and Pooja pages from the API instead of route placeholders.

### 4. Complete public and role-based experiences

1. Build real About, service catalogue, service detail, blog listing/detail, login, booking history, and booking detail pages.
2. Add devotee account/profile screens.
3. Add a Pandit application/review workflow and separate Pandit dashboard only once verification rules are defined.
4. Add an admin dashboard with server-enforced permissions for users, services, Pandit verification, and bookings.

### 5. Production readiness

1. Add request logging, structured API error handling, rate limiting on auth endpoints, security headers, and CORS configured per environment.
2. Add database indexes and migration/seed strategy; never rely on development data for service catalogues.
3. Add observability, backups, and a deploy configuration for client and API origins.
4. Review privacy/consent requirements for phone numbers, WhatsApp updates, and spiritual-service booking data.

## Suggested API surface

| Method | Endpoint | Responsibility |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account or Pandit application |
| POST | `/api/auth/login` | Authenticate and issue a short-lived access token |
| POST | `/api/auth/refresh` | Refresh session safely |
| POST | `/api/auth/logout` | Revoke active refresh token/session |
| GET | `/api/auth/me` | Hydrate current authenticated user |
| GET | `/api/pujas` | List available puja services |
| GET | `/api/availability` | Query eligible Pandits/muhurat availability |
| POST | `/api/bookings` | Create a booking request |
| GET | `/api/bookings/me` | List current user bookings |
| GET/PATCH | `/api/bookings/:id` | Read/update an authorized booking |

## Definition of done for a feature

- Routes, API contract, authorization, validation, loading, empty, success, and failure states are addressed.
- Sensitive data is absent from client state and API responses.
- User-facing flows have tests; lint and production build pass.
- Responsive and keyboard-accessible UI preserves the existing brand tokens.
- Configuration and any migration/seed changes are documented.
