# Pelaguru

This project was generated using [Nx](https://nx.dev).

### Project setup

#### Step 1

- Clone this project
- Got to project folder

#### Step 2

> Install dependencies

- `npm i`
- `npm i -g concurrently`

> Firebase CLI (if not installed)

- `npm i -g firebase-tools`
- `firebase login`

> Firebase CLI (if not logged in)

- `firebase login`

> Firebase CLI (if installed and logged in)

- `firebase use pelaguru-dev`

> Add firebase credentials

- coppy `pelaguru-dev.json` file into `pelaguru/apps/back-end/keys`

#### Step 3

> Run project

- Front-end - `ng serve front-end`
- Admin Dashboard - `ng serve admin-dashboard`
- Back-end
  -- `npm run firebase:serve` (Ubuntu)
  -- `npm run firebase:win_serve` (Windows)

#### Step 4

> Deploy

- Front-end
  -- `npm run firebase:host_deploy`
- Back-end
  -- `npm run firebase:func_deploy`
- Front-end & Back-end
  -- `npm run firebase:deploy`
