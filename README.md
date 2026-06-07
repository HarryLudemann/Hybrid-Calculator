# BAIC Hybrid Savings Calculator

A clean, professional hybrid vehicle savings calculator built with Next.js and Tailwind CSS.

## Features

- **Real-time calculations** with instant updates
- **BAIC vehicle presets** (BJ30 Hybrid, X55 PHEV, and petrol comparisons)
- **Custom input mode** for any vehicle specifications
- **Clean, modern UI** optimized for desktop and mobile
- **Professional results display** showing annual/5-year savings and break-even time

## Vehicle Image Setup

### Adding Vehicle Images

Add vehicle images to the `public/vehicles/` folder with the following naming convention:

```
public/vehicles/
├── bj30-hybrid.png      (BAIC BJ30 Hybrid)
├── x55-phev.png         (BAIC X55 Plug-in Hybrid)
├── x55-petrol.png       (BAIC X55 Petrol)
├── b30-petrol.png       (BAIC B30 Petrol)
└── x7-petrol.png        (BAIC X7 Petrol)
```

### Image Specifications

- **Dimensions:** 768x339 pixels
- **Format:** PNG (transparent background recommended)
- **Content:** Vehicle only, no background
- **Quality:** High resolution for professional appearance

## Available BAIC Presets

### Hybrid Vehicles
- **BAIC BJ30 Hybrid**: 6.5 L/100km, $32,000
- **BAIC X55 Plug-in Hybrid**: 5.2 L/100km, $38,000

### Petrol Vehicles
- **BAIC X55 Petrol**: 8.5 L/100km, $28,000
- **BAIC B30 Petrol**: 7.8 L/100km, $22,000
- **BAIC X7 Petrol**: 9.2 L/100km, $30,000

## Customizing Presets

To add or modify vehicle presets, edit `app/components/HybridCalculator.tsx`:

```typescript
const BAIC_PRESETS: Record<string, Vehicle> = {
  'MODEL-KEY': {
    name: 'Display Name',
    image: '/vehicles/filename.png',
    fuelEconomyL100km: 7.5,
    price: 30000,
    isHybrid: true, // or false for petrol
  },
  // ... more vehicles
};
```

## Usage

1. Select hybrid and petrol vehicles from presets or use custom values
2. Adjust annual kilometers (default: 15,000 km)
3. Adjust fuel price (default: $2.80 NZD)
4. View real-time calculations:
   - Annual fuel costs
   - Annual savings
   - 5-year cumulative savings
   - Break-even time

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/
│   ├── components/
│   │   └── HybridCalculator.tsx    # Main calculator component
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── public/
│   └── vehicles/                   # Vehicle images (768x339)
├── package.json
└── tsconfig.json
```

## Technology Stack

- **Next.js 16+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## Branding Colors

- BAIC Red: `#D50000` (used for hybrid highlights)
- Dark backgrounds for professional automotive aesthetic
- High contrast for readability

## License

Professional website for BAIC Wellington

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
