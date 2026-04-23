# EventHub

A modern event management platform built with Next.js and Node.js/Express.

## Features

- **Event Discovery** - Browse and explore upcoming events
- **User Authentication** - Secure login and registration system
- **Booking System** - Book events with a seamless booking modal
- **Dashboard** - Manage bookings, reviews, and user profile
- **AI Assistant** - Get event recommendations powered by AI
- **Blog** - Latest news and updates about events

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: (Configure your database in EventHub-Server)

## Getting Started

### Frontend Setup

```bash
cd EventHub
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

```bash
cd EventHub-Server
npm install
npm run dev
```

The API runs on [http://localhost:5000](http://localhost:5000).

## Project Structure

```
EventHub/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable React components
│   ├── context/      # React Context (Auth, Theme)
│   ├── data/         # Static data files
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utility functions
│
EventHub-Server/
├── src/
│   ├── api/          # API route handlers
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth & error handling
│   ├── models/       # Database models
│   └── routes/      # Express routes
```

## Available Pages

- `/` - Home/Landing page
- `/events` - Browse events
- `/explore` - Explore events
- `/blog` - Blog posts
- `/contact` - Contact page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard (requires auth)
- `/about` - About page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
