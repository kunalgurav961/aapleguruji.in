# Updating Aaple Guruji on an existing VPS

This guide updates the application code in an already configured VPS checkout.
It does not replace, edit, reload, or restart Nginx, the firewall, MongoDB, or
any other shared VPS service. Only restart the existing Aaple Guruji API
process, and only after confirming which process manager currently runs it.

## What is deployed

- The API is started by `server/server.js` and listens on `PORT` (default
  `3000`).
- The React/Vite production build is written to `client/dist`.
- The frontend makes same-origin `/api/` requests. The existing web-server
  configuration must already serve the frontend and route `/api/` to the API.
  Keep that existing configuration unchanged.
- Runtime environment variables belong in `server/.env`. Do not commit or
  replace the VPS copy.

## 1. Publish code from the development machine

Commit and push the intended code and documentation to the branch deployed by
the VPS (the examples below use `main`). Review the staged file list and avoid
staging environment files, `node_modules`, or generated build output:

```sh
git status --short
git add .gitignore VPS_DEPLOYMENT.md server/.env.example client server
git diff --cached --stat
git diff --cached --name-only
git commit -m "Prepare VPS deployment guide"
git push origin main
```

If the VPS tracks a branch other than `main`, substitute its actual branch name.

## 2. Back up the VPS environment and inspect the incoming update

SSH into the VPS and change to the existing repository directory:

```sh
cd /path/to/aaple-guruji
git status --short
git branch --show-current
git remote -v
```

Do not discard or overwrite unexpected local changes. Resolve them or make a
separate backup before continuing. The repository previously tracked
`server/.env`; the update removes it from Git so future pulls cannot replace
the VPS configuration. Back it up outside the checkout before pulling:

```sh
if [ -f server/.env ]; then
  cp -p server/.env "$HOME/aaple-guruji-server.env.backup"
fi
```

Fetch first and inspect the file list. Stop if it includes VPS-specific files
or unexpected changes. The expected cleanup includes Git removals for
`server/.env`, `server/node_modules`, `.vite`, and `.DS_Store`; the VPS `.env`
is backed up and restored below, and app dependencies are reinstalled from
their lockfile:

```sh
git fetch origin
git diff --name-status HEAD..origin/main
```

If `server/.env` is locally modified, preserve the backup above, then restore
only that tracked path so Git can apply its removal cleanly:

```sh
git restore -- server/.env
```

If `git status` also shows changes under `server/node_modules`, confirm these
are only locally installed dependency files. They are reproducible from the
lockfile and will be reinstalled in the next section. After confirming that,
restore only this generated dependency directory so the fast-forward can
proceed:

```sh
git restore --staged --worktree -- server/node_modules
```

Do not run `git reset --hard`, `git clean`, or a force pull. Fast-forward only:

```sh
git pull --ff-only origin main
```

Restore the saved VPS configuration. The backup is outside the repository and
remains available for recovery:

```sh
if [ -f "$HOME/aaple-guruji-server.env.backup" ]; then
  install -m 600 "$HOME/aaple-guruji-server.env.backup" server/.env
fi
```

Confirm `server/.env` is present and populated without printing its contents:

```sh
test -s server/.env && echo "VPS environment file is present"
git check-ignore server/.env
```

`server/.env.example` documents the required variable names; it is a template,
not a replacement for the VPS environment file.

## 3. Install this project's dependencies and build its frontend

The repository no longer tracks `server/node_modules`. Recreate the API's
production dependencies from its lockfile, install the client dependencies,
and rebuild the frontend:

```sh
node --version
npm --version
npm ci --prefix server --omit=dev
npm ci --prefix client
npm run build --prefix client
```

Use a Node.js version compatible with the checked-in dependencies and the
version already supported by the VPS. These commands affect this project's
dependency directories and build output only.

## 4. Restart only the existing application process

Identify how this app's API is currently managed; do not guess a service name:

```sh
pm2 list
systemctl list-units --type=service --state=running
```

Restart only the existing Aaple Guruji API process using its current manager
(for example, the existing PM2 application name or systemd unit). Do not
restart or reload Nginx or any other VPS service. Static files are updated in
`client/dist`; the existing web-server configuration is left as-is.

If the current process manager is neither PM2 nor systemd, use the existing
project-specific restart procedure already configured on the VPS.

## 5. Verify

Use the current production hostname to check the existing health endpoint and
puja API route:

```sh
curl -fsS https://your-domain.example/
curl -fsS https://your-domain.example/api/booking/poojas
```

Then verify the login, booking, and admin pages in a browser. Admin APIs require
an authenticated administrator account.

## Environment-file history

Ignoring or untracking `server/.env` does not remove it from earlier Git
commits. If real credentials were ever pushed to a remote, rotate those
credentials and update the VPS environment file securely.
