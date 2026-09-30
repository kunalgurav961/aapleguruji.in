# Working Context for Aaple Guruji

## Repository layout

```
.
├── client/                 # React/Vite single-page application
│   └── src/
│       ├── app/            # store, router, layout
│       ├── config/         # Axios configuration
│       ├── constants/      # route definitions
│       ├── features/       # auth, booking, public
│       └── shared/         # cross-feature UI
├── server/                 # Express + Mongoose API
│   ├── app/                # middleware and router mounting
│   ├── config/             # environment and DB connection
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── understanding.md        # project analysis
└── approach.md             # recommended delivery plan
```

## Commands

Run these from their respective directories:

```bash
cd client && npm run dev       # Vite development server (normally 5173)
cd client && npm run build     # production bundle
cd client && npm run lint      # ESLint (currently fails; see understanding.md)

cd server && npm run dev       # nodemon; package script has no explicit entry
cd server && npm start         # node server.js
```

`server npm run dev` currently invokes bare `npx nodemon`; prefer changing it to `nodemon server.js` when touching project scripts.

## Required server environment

The server reads these keys:

```dotenv
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/aaple-guruji
ACCESS_TOKEN=long-random-access-secret
REFRESH_TOKEN=long-random-refresh-secret
```

The server accepts standard `PORT` (and temporarily supports lowercase `port` for compatibility), defaulting to `3000`. Never commit real connection strings or JWT secrets.

## Existing integration contract

- Client Axios base URL: `http://localhost:3000/` in `client/src/config/api.jsx`.
- Server CORS origin: `http://localhost:5173` in `server/app/app.js`.
- Registered route: `POST /api/auth/register`.
- Request fields currently submitted by the registration form: `fullName`, `mobileNumber`, `city`, `email`, `password`, `confirmPassword`, `role`, `terms`, `whatsappUpdates`, plus `vedicShakha` and `experience` for Pandits.
- Current success shape: `{ message, data: { user }, accessToken }`; a refresh token is set as an HTTP-only cookie.

## High-priority implementation notes

1. The authentic Redux spelling should be `isAuthenticated`; current code consistently stores `isAthenticated` but the protection component reads `isAuthenticated`.
2. `authActions.registerUser` must `throw`/`rejectWithValue` on API errors; otherwise failed requests resolve as fulfilled.
3. `useAuthHook` calls `toast.error` without importing `toast`.
4. `userModel` defines only `fullName`, `email`, `passwordHash`, and `refresh_token`. Values collected outside this schema are not retained.
5. Registration response must use `user.fullName`, not `user.name`.
6. Avoid putting a JWT access token in Redux/local storage unless its threat model is deliberate. The current code returns it but does not persist or use it.
7. The quick-booking form only writes to Redux. Treat it as a draft until a backend booking API exists.

## UI guardrails

- Preserve the Marathi/English bilingual tone and spiritual-service vocabulary.
- Reuse CSS variables from `client/src/index.css` and existing Tailwind patterns rather than introducing a second visual system.
- Favor small feature-local components and hooks. Shared primitives belong under `src/shared/`.
- The navbar references `/src/assets/images/logo.png` as a public URL. Move it to `client/public/` or import it from the component before relying on a production deployment configuration.

## Current risks to avoid

- Do not edit or restore the pre-existing deleted legacy PHP/Laravel files without explicit direction; the working tree already contains unrelated changes.
- Do not expose raw refresh tokens in API responses or browser-readable storage.
- Do not silently swallow database/auth errors; add centralized error middleware and predictable error responses.
- Avoid feature work that assumes booking, roles, or payment have been implemented—they are planned, not present.
