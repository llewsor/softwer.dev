# softwer.dev

Portfolio/contact website built with React, TypeScript, Vite, Express, and Nodemailer.

## Structure

```text
.
├── docker-compose.yml
├── .env.example
└── ui/
    ├── src/
    ├── server/
    ├── dockerfile
    └── nginx.conf
```

## Local Development

Install and run the UI/dev server from the app folder:

```bash
cd ui
npm install
npm run dev
```

## Docker Deployment

Use the same layout as your other apps:

```text
/opt/apps/portfolio/
├── docker-compose.yml
├── .env
└── ui/
```

Create `.env` from `.env.example` beside `docker-compose.yml`:

```bash
MAIL_USER=
MAIL_PASS=
CORS_ORIGINS=https://softwer.dev,https://www.softwer.dev
```

Then run:

```bash
docker compose up -d --build
```

## Features

- Light/dark theme toggle with `localStorage` and TailwindCSS custom colors
- Contact form with backend API (`/api/contact`) powered by Express and Nodemailer
- File attachment support with `multer`
- Confirmation email to the client plus full submission to admin
- Animated testimonials using `framer-motion`
- Smooth scroll navigation using `react-scroll`
- Responsive design with TailwindCSS

## Technologies

- React + TypeScript
- Vite
- TailwindCSS
- Express (TypeScript)
- Nodemailer
- Framer Motion
- React Scroll
