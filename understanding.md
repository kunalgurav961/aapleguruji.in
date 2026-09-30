# Aaple Guruji: Project Understanding

## Purpose

Aaple Guruji is an early-stage marketplace for arranging Vedic pujas with verified pandits. The current product language and UI target Maharashtra: users can select a puja, location, language, date, and whether samagri is required. The registration flow supports both `devotee` and `pandit` roles.

## Current architecture

```
Browser
  └─ React 19 + Vite + Tailwind CSS v4 (`client/`, port 5173)
       ├─ React Router routes and shared layout
       ├─ Redux Toolkit: auth and in-progress booking data
       ├─ React Hook Form: booking and registration forms
       └─ Axios → Express API (`server/`, expected port 3000)
                              └─ Mongoose → MongoDB
```

The frontend is the most developed portion. The backend presently exposes a health response at `GET /` and registration at `POST /api/auth/register`.

## Code map

| Area | Location | State |
| --- | --- | --- |
| App bootstrap and global styling | `client/src/main.jsx`, `client/src/index.css` | Implemented |
| Routes and shared navigation | `client/src/app/`, `client/src/constants/navigations.jsx`, `client/src/shared/` | Basic public routes implemented |
| Landing/quick booking form | `client/src/features/public/` | UI implemented; data is Redux-only |
| Authentication UI/state | `client/src/features/auth/` | Registration UI implemented; login/hydration incomplete |
| Booking state | `client/src/features/booking/` | Single transient Redux value only |
| Express application | `server/app/app.js`, `server/server.js` | Minimal setup |
| Authentication API | `server/routes/`, `server/controllers/`, `server/models/` | Registration only |

## Implemented user behavior

- The responsive navbar exposes Home, About, Pooja, Bookings, Blog, Login, and Register paths.
- The home page renders a polished hero section and validates its quick-booking form with React Hook Form.
- Submitting quick booking saves the form object in Redux; it does not navigate, call an API, create a record, or show results.
- Registration validates most client-side fields, posts to `POST /api/auth/register`, and displays toast feedback.
- The server hashes submitted passwords, creates a MongoDB user, generates access and refresh JWTs, stores the refresh token, and sets a cookie.

## Incomplete or placeholder behavior

- Login is a placeholder page; logout, session restore, refresh, and authenticated API calls are absent.
- About and Pooja pages are placeholders. Blog and booking pages render a basic heading only.
- `HomeProtected` reads a misspelled `isAuthenticated` key while the store uses `isAthenticated`, and it does not gate any route.
- Booking is neither persisted nor represented by a database model/API.
- Role-specific registration data is read by the server but missing from the Mongoose schema, so Mongoose drops those fields under its default strict mode.
- The API only checks for a matching email *and* name when detecting an existing user. Because email is unique, a duplicate email with another name reaches MongoDB and can raise an unhandled duplicate-key error.
- The registration success payload uses `user.name`, but the schema field is `fullName`; the returned name is therefore undefined.
- The client thunk catches API failures without rejecting. Redux can mark failed registrations as fulfilled with `undefined`.

## Technology and conventions

- JavaScript ESM throughout; no TypeScript.
- Frontend feature folders use `api`, `hooks`, `state`, and `ui` subdivisions.
- UI uses Tailwind utility classes plus CSS variables in `index.css`; the visual system is saffron/maroon/cream with English and Marathi copy.
- API configuration is hard-coded in the client (`http://localhost:3000/`) and CORS permits only `http://localhost:5173`.
- Server configuration reads `PORT`, `MONGODB_URI`, `ACCESS_TOKEN`, and `REFRESH_TOKEN` from environment variables. A local server `.env` is present but is not tracked in Git.

## Verification snapshot

From the inspected state:

- `client npm run build`: passes. Vite reports a generated JavaScript chunk slightly over 500 kB.
- `client npm run lint`: fails with 26 errors and one warning, primarily unused imports/variables, an undefined `toast` in `useAuthHook`, empty auth API blocks, and a mixed component/route-constants module warning.
- The repository has significant pre-existing uncommitted/deleted legacy PHP/Laravel files plus untracked React/server directories. These were not altered during this analysis.
