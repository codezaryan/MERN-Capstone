# MERN Capstone Project Structure

## Overview
This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application with separate frontend, backend, and admin panels.

## Project Architecture
```
MERN-Capstone/
├── capstone-frontend/          # React Frontend (User Portal)
├── capstone-backend/           # Node.js Express Backend
├── capstone-admin/             # React Admin Panel
└── PROJECT_STRUCTURE.md        # This file
```

---

## 1. Frontend Structure (`capstone-frontend/`)
**Tech Stack**: React 19, TypeScript, TailwindCSS, React Router v7, Shadcn/ui

```
capstone-frontend/
├── public/                     # Static assets
│   ├── placeholder images
│   └── vite.svg
├── src/
│   ├── assets/                 # Images, logos, icons
│   ├── auth/                   # Authentication context & forms
│   │   ├── auth-context.tsx
│   │   ├── auth-page.tsx
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── dashboard-content.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── post-modal.tsx
│   │   ├── posts-content.tsx
│   │   ├── settings-content.tsx
│   │   ├── sidebar.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── users-content.tsx
│   │   └── ...
│   ├── pages/                  # Route components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Profile.tsx
│   │   ├── CreatePost.tsx
│   │   ├── PostDetail.tsx
│   │   └── blog/               # Blog-specific pages
│   ├── routes/                 # React Router configuration
│   │   └── AppRoutes.tsx
│   ├── services/               # API service layer
│   ├── context/                # React contexts
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── main.tsx                # React entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 2. Backend Structure (`capstone-backend/`)
**Tech Stack**: Node.js, Express.js, MongoDB (implied from MERN)

```
capstone-backend/
├── src/
│   ├── index.js                # Server entry point
│   ├── config/                 # Database & app configuration
│   │   └── db.js
│   ├── controllers/            # Route controllers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware/             # Custom middleware
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── routes/                 # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── models/                 # MongoDB schemas (to be added)
│   └── utils/                  # Utility functions
├── package.json
└── .env (to be created)
```

---

## 3. Admin Panel Structure (`capstone-admin/`)
**Tech Stack**: React, TypeScript, Vite

```
capstone-admin/
├── public/
├── src/
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # React entry point
│   ├── pages/                  # Admin route pages
│   │   ├── AdminLogin.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ManagePosts.tsx
│   │   └── ManageUsers.tsx
│   ├── components/             # Admin-specific components
│   └── assets/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Recommended Next Steps

### 1. Backend Setup
```bash
cd capstone-backend
npm install
# Add missing dependencies:
npm install mongoose cors dotenv bcryptjs jsonwebtoken
# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/capstone
# JWT_SECRET=your-secret-key
# PORT=5000
```

### 2. Frontend Setup
```bash
cd capstone-frontend
npm install
# Add missing dependencies:
npm install axios
```

### 3. Admin Panel Setup
```bash
cd capstone-admin
npm install
# Add missing dependencies:
npm install axios react-router-dom
```

### 4. Development Scripts
```json
// In root package.json (create if needed)
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\" \"npm run dev:admin\"",
    "dev:backend": "cd capstone-backend && npm run dev",
    "dev:frontend": "cd capstone-frontend && npm run dev",
    "dev:admin": "cd capstone-admin && npm run dev"
  }
}
```

---

## API Endpoints Structure (Backend)
```
/api/auth
  POST /register
  POST /login
  POST /logout

/api/users
  GET /profile/:id
  PUT /profile/:id
  DELETE /user/:id

/api/posts
  GET /posts
  GET /posts/:id
  POST /posts
  PUT /posts/:id
  DELETE /posts/:id

/admin
  GET /users
  GET /posts
  DELETE /users/:id
  DELETE /posts/:id
```

---

## Environment Variables Template
Create `.env` files in respective directories:

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/capstone
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Admin (.env)
```
VITE_API_URL=http://localhost:5000/api
```

This structure provides a solid foundation for building a scalable MERN application with separate user and admin interfaces.
