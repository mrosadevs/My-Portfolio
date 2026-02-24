# 💼 Manuel Rosales — Portfolio

### Software Engineer & Designer

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v3.4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A modern, animated developer portfolio showcasing projects, experience, and skills. Built with Next.js, TypeScript, and Tailwind CSS.**

[🌐 Live Site](https://mrosadev.site)

</div>

---

## ✨ Features

- 🎯 **Hero Section** — Animated intro with name, title, and CTA
- 👤 **About** — Background, skills, and personal story
- 💼 **Experience** — Timeline of professional work and education
- 🚀 **Projects** — Showcase of featured builds with links and descriptions
- 📬 **Contact** — Reach-out section with social links
- 🌙 **Dark Theme** — Sleek dark aesthetic with noise texture overlay
- 📱 **Fully Responsive** — Mobile-first design
- 🖼️ **Dynamic OG Image** — Auto-generated social preview banner via `next/og`

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| ⚛️ Framework | Next.js 14 (App Router) |
| 🟦 Language | TypeScript |
| 🎨 Styling | Tailwind CSS v3.4 |
| 🔤 Fonts | Inter + JetBrains Mono (via `next/font`) |
| 🖼️ OG Image | `next/og` ImageResponse |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

---

## 📂 Project Structure

```
My-Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + metadata + OG config
│   │   ├── page.tsx                # Home page
│   │   ├── opengraph-image.tsx     # Dynamic OG banner generator
│   │   └── globals.css             # Global styles
│   └── components/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Contact.tsx
│       ├── Navbar.tsx
│       └── Footer.tsx
├── public/                         # Static assets
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

<div align="center">

🚀 **Built with code and creativity** ✨

</div>
