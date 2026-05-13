# NextGen Market - AI-Powered eCommerce Platform

NextGen Market is a premium, full-stack eCommerce solution designed for the future. It features high-end UI/UX, AI-driven recommendations, voice navigation, and enterprise-level analytics.

## ✨ Features

- **Storefront**: High-performance browsing with premium Apple/Tesla design patterns.
- **AI Chatbot**: Intelligent assistant powered by Gemini for recommendations and FAQs.
- **Voice Navigation**: Search, navigate, and manage your cart using voice commands.
- **Admin Dashboard**: Real-time sales analytics, inventory control, and user management.
- **Enterprise Tech**: Next-gen stack with Prisma ORM, JWT Auth, and Express.
- **Multilingual**: Supports English, Français, and Kinyarwanda.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- MySQL (Optional, SQLite used by default for immediate use)
- XAMPP/phpMyAdmin (For importing the provided MySQL script)

### 2. Installation
```bash
npm install
```

### 3. Database Setup
The app comes pre-configured with SQLite for instant usability.
To use MySQL:
1. Import `database/schema.sql` into phpMyAdmin.
2. Update `.env` with your MySQL connection string.
3. Run `npm run prisma generate`.

### 4. Development
```bash
npm run dev
```

### 5. Production Build
```bash
npm run build
npm start
```

## 🐳 Docker Setup
```bash
docker-compose up --build
```

## 🛠 Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Zustand, ShadCN UI.
- **Backend**: Node.js, Express, Prisma ORM.
- **AI**: Google Gemini API.
- **Voice**: Web Speech API.

---
Designed with ❤️ by NextGen Engineers.
