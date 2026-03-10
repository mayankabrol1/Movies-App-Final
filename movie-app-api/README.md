# Movie App API

Backend starter for account auth + saved library using Express and MongoDB.

## Features

- Google sign-in endpoint (`POST /auth/google/callback`) using Google ID token verification
- JWT access + refresh token issue and refresh rotation
- Profile endpoint (`GET /me`)
- Saved library endpoints (`GET /saved`, `POST /saved`, `DELETE /saved/:mediaType/:tmdbId`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env file:

```bash
cp .env.example .env
```

3. Fill in `.env` values.

4. Run locally:

```bash
npm run dev
```

## API quick test

- `GET /health` should return `{ ok: true }`.

## Notes

- This starter expects the Expo app to send a Google `idToken` to `POST /auth/google/callback`.
- For production, enforce strict CORS origins and rotate secrets regularly.
