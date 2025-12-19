# Santa Shuffle 🎅

A simple and fun Secret Santa gift exchange organizer. Create exchanges, add participants, draw names randomly, and manage wishlists — all in one place.

## Features

- **Create Exchanges** — Set up gift exchanges with a name, budget, and date
- **Add Participants** — Invite friends and family with their name and email
- **Random Drawing** — Fair, random Secret Santa assignments with one click
- **Wishlists** — Participants can add gift ideas to help their Secret Santa
- **Reveal Cards** — Privately reveal who you're giving a gift to
- **Local Storage** — Your data stays on your device, no account needed

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **shadcn/ui** components

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── Hero.tsx         # Landing page hero section
│   ├── Navbar.tsx       # Navigation bar
│   ├── ParticipantForm.tsx
│   ├── AssignmentReveal.tsx
│   └── WishlistManager.tsx
├── context/
│   └── ExchangeContext.tsx   # State management + types
├── hooks/
│   └── use-toast.tsx    # Toast notifications
├── pages/
│   ├── Home.tsx         # Landing page
│   ├── CreateExchange.tsx
│   ├── ExchangeDetail.tsx
│   ├── ExchangesList.tsx
│   └── NotFound.tsx
├── lib/
│   └── utils.ts         # Utility functions
└── App.tsx              # Main app with routing
```

## How It Works

1. **Create an Exchange** — Give it a name, set a budget, pick a date
2. **Add Participants** — Enter names and emails of everyone joining
3. **Draw Names** — Click to randomly assign Secret Santas
4. **Share Wishlists** — Each person can add gift ideas
5. **Reveal Assignments** — Privately see who you're buying for

## License

MIT
