# TikTok Landing Page - Hemafield Flowers

A high-converting TikTok landing page for flower orders with lead capture and WhatsApp integration.

## 📁 Folder Contents

```
tiktok-landing-download/
├── TikTokLandingPage.tsx    # Main consolidated component (ALL code in one file)
├── README.md                 # This file
└── assets/                   # You need to copy assets here (see below)
```

## 🚀 Quick Start

1. **Copy this entire folder** to your new project
2. **Copy the assets** (see Required Assets below)
3. **Install dependencies** (see below)
4. **Update configuration** in `TikTokLandingPage.tsx`
5. **Import and use** the component

## 📦 Required Assets

Copy these files from the main project into your new project's assets folder:

```
src/assets/
├── hemafield-logo.png
├── flowers-hero.jpg
└── flowers/
    ├── roses-chocolates-heart.jpg
    ├── teddy-roses.jpg
    ├── red-bouquet-kraft.jpg
    ├── heart-roses-chocolates.jpg
    ├── pink-basket.jpg
    ├── white-roses-red-center.jpg
    ├── pink-mixed-bouquet.jpg
    ├── luxury-box-set.jpg
    ├── chocolate-heart-box.jpg
    └── red-roses-white-box.jpg
```

## 📋 Dependencies

```bash
npm install @emailjs/browser lucide-react tailwindcss class-variance-authority clsx tailwind-merge @radix-ui/react-slot
```

## ⚙️ Configuration

Update these values in `TikTokLandingPage.tsx`:

```typescript
const WHATSAPP_NUMBER = "2348000000000"; // Your WhatsApp number
const EMAILJS_PUBLIC_KEY = "your_public_key";
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
```

## 🎨 Required CSS Variables

Add these to your `index.css` or global styles:

```css
:root {
  --background: 30 20% 98%;
  --foreground: 30 10% 15%;
  --card: 30 20% 96%;
  --card-foreground: 30 10% 15%;
  --popover: 30 20% 98%;
  --popover-foreground: 30 10% 15%;
  --primary: 30 15% 25%;
  --primary-foreground: 30 20% 98%;
  --secondary: 30 15% 92%;
  --secondary-foreground: 30 15% 25%;
  --muted: 30 10% 85%;
  --muted-foreground: 30 10% 45%;
  --accent: 30 15% 90%;
  --accent-foreground: 30 15% 25%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 30 15% 85%;
  --input: 30 15% 85%;
  --ring: 30 15% 25%;
  --radius: 0.75rem;
  
  /* Custom colors */
  --rose-red: 350 80% 55%;
  --forest-green: 145 45% 35%;
  --gold: 45 90% 55%;
}

/* Font families */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');

.font-display {
  font-family: 'Playfair Display', serif;
}

.font-body {
  font-family: 'Source Sans Pro', sans-serif;
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

/* Shadow for popup */
.shadow-popup {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

## 🔧 Tailwind Config

Add these to your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'rose-red': 'hsl(var(--rose-red))',
        'forest-green': 'hsl(var(--forest-green))',
        'gold': 'hsl(var(--gold))',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
}
```

## ✨ Features

- ⏰ Countdown timer for urgency
- 📱 WhatsApp order integration
- 🎁 Lead capture popup with discount offer
- 🌸 Flower category cards with hover effects
- 📷 Photo gallery with order buttons
- ⭐ Customer testimonials
- 📊 Google Analytics 4 event tracking
- 📱 Fully responsive design

## 📖 Usage

```tsx
import TikTokLandingPage from './tiktok-landing-download/TikTokLandingPage';

function App() {
  return <TikTokLandingPage />;
}
```

## 🔗 Asset Path Updates

If your asset paths differ, update the imports at the top of `TikTokLandingPage.tsx`:

```typescript
// Update these paths to match your project structure
import flowersHero from "./assets/flowers-hero.jpg";
import hemafieldLogo from "./assets/hemafield-logo.png";
// ... etc
```
