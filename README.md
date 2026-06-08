# Hybrid Calculator

A fast, mobile-friendly calculator that compares hybrid vs petrol running costs — annual fuel savings, 5-year net savings, and break-even time.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your public URL (e.g. `https://hybrid.harryludemann.com`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID (e.g. `G-XXXXXXXXXX`) |

Analytics only loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.

### Setting up Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/) and create a property.
2. Add a **Web** data stream for your domain.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
4. Add it to `.env.local` and your hosting provider's environment variables (e.g. Vercel → Settings → Environment Variables).

## Deploy

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add environment variables from `.env.example`.
4. Deploy.

### Manual build

```bash
npm run build
npm start
```

## Project structure

```
app/
├── components/HybridCalculator.tsx   # Calculator UI
├── layout.tsx                        # Metadata & analytics
├── page.tsx                          # Home page
└── globals.css

lib/
└── calculations.ts                   # Savings logic
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint |

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
