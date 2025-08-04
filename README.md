# 📚 Library Management System (Node.js + Express + MongoDB)

A modular Node.js application for tracking books, users, and borrowings in a library using clean architecture principles, MongoDB, and Express.

---

## ✨ Features

- 📖 Add, list, and manage books
- 👤 Track users and their borrowed books
- 🕓 Set due dates (14 days after borrowing)
- 💰 Calculate fines (₹1 per day after due date)
- 📋 View current and past borrowing history
- 🔍 Check overdue books and unpaid fines

---

## 🗂️ Project Structure

```
library-app/
├── apps/
│   ├── books/
│   │   ├── data-access/
│   │   ├── domain/
│   │   ├── dto/
│   │   └── entry-points/api/
│   ├── users/
│   │   ├── data-access/
│   │   ├── domain/
│   │   ├── dto/
│   │   └── entry-points/api/
│   └── borrowings/
│       ├── data-access/
│       ├── domain/
│       ├── dto/
│       └── entry-points/api/
├── index.js
├── package.json
├── .env
├── .gitignore
├── eslint.config.mjs
└── README.md
```

---

## 📦 Tech Stack

- Node.js
- Express
- MongoDB (via Mongoose)
- ESLint (Flat Config)
- Prettier
- dotenv
- Workspaces (Monorepo-style structure)

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd library-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/library
```

### 4. Start MongoDB (if not running)

```bash
mongod
```

### 5. Start the app

```bash
npm start
```

---

## 🔌 API Endpoints

### 📚 Books

- `GET /books`
- `POST /books`  
  `{ "title": "...", "author": "...", "availableCopies": 3 }`

### 👤 Users

- `GET /users`
- `POST /users`  
  `{ "name": "...", "email": "..." }`

### 🔄 Borrowings

- `POST /borrowings/borrow`  
  `{ "userId": "...", "bookId": "..." }`
- `POST /borrowings/return/:id`
- `GET /borrowings` → active only
- `GET /borrowings/history` → full history
- `GET /borrowings/overdue`
- `GET /borrowings/user/:userId` → current
- `GET /borrowings/user/:userId/history` → full
- `GET /borrowings/user/:userId/fine`
- `GET /borrowings/book/:bookId` → current holders
- `GET /borrowings/book/:bookId/history` → full

---

## 🧼 Code Style & Tooling

### Format code using Prettier

```bash
npm run format
```

### Lint code using ESLint (Flat Config)

```bash
npm run lint
npm run lint:fix
```

---

## ✅ Features You Can Add Next

- Auth (JWT or session-based)
- Pagination / search
- Admin vs User roles
- React frontend
- Deploy to Render/Railway/EC2

---

## 🤝 Contributions

Pull requests welcome! This is a great base to experiment with Node.js architecture best practices.
