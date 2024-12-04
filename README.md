# Folen POC demo

Install dependencies:

```sh
pnpm install
```

Create `.env` and set oauth values:

```ini
NEXT_PUBLIC_FOLEON_API_BASE_URL = "https://api.foleon.com"
NEXT_PUBLIC_FOLEON_OAUTH_CLIENT_ID = "..."
NEXT_PUBLIC_FOLEON_OAUTH_CLIENT_SECRET = "..."
```

Run tests:

```sh
pnpm run test
# or
pnpm run test:watch
```

Run development server:

```sh
pnpm run dev
```

Build for production:

```sh
pnpm run build
```

Preview production build:

```sh
pnpm run start
```
