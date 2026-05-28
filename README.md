# 🛒 ShopNow — Full Stack E-Commerce Application

A production-ready full-stack e-commerce web application built with the MERN stack, TypeScript, and modern React architecture. Features a complete shopping experience including product browsing, cart management, user authentication, and order flow.

**Live Demo → [vamshidev-ecommerce.vercel.app](https://vamshidev-ecommerce.vercel.app)**

---

## ✨ Features

- 🔐 **User Authentication** — JWT-based register, login, and protected routes
- 🛍️ **Product Catalogue** — Browse, search, and filter products
- 🛒 **Cart Management** — Add, remove, and update quantities with persistent state
- 📦 **Order Flow** — Complete checkout and order placement
- 📱 **Responsive Design** — Fully mobile-friendly UI with Tailwind CSS
- ⚡ **Performance Optimised** — Lazy loading, code splitting, and API response caching
- 🌙 **Clean UI** — Component-based design system with reusable components

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework with type safety |
| Redux Toolkit | Global state management (cart, auth) |
| TanStack React Query | Server state, API caching, background sync |
| React Router DOM | Client-side routing and navigation |
| Tailwind CSS | Utility-first responsive styling |
| Axios | HTTP client for API integration |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT | Secure authentication |
| bcrypt | Password hashing |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |

---

## 🏗️ Architecture

```
eCommerce_Client/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route-level page components
│   ├── store/             # Redux Toolkit slices and store
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Axios API service layer
│   ├── types/             # TypeScript interfaces and types
│   └── utils/             # Helper functions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/VamshivamcV/eCommerce_Client.git
cd eCommerce_Client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your backend API URL to .env
# REACT_APP_API_URL=your_backend_url

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🔑 Key Implementation Highlights

**State Management Strategy**
- Client state (cart, UI) managed with Redux Toolkit
- Server state (products, orders) managed with TanStack React Query
- Eliminates redundant API calls through intelligent caching

**Performance Optimisations**
- React.lazy() and Suspense for route-based code splitting
- React Query cache prevents duplicate network requests
- Memoised components to avoid unnecessary re-renders

**Type Safety**
- Full TypeScript coverage across components, API responses, and Redux state
- Custom type definitions for all data models

---

## 🌐 Backend Repository

The backend API is in a separate repository:
👉 [eCommerce Server](https://github.com/VamshivamcV/eCommerce_Server) *(add your backend repo link here)*

---

## 📬 Connect with Me

- 💼 [LinkedIn](https://www.linkedin.com/in/vamshivuppunutula/)
- 🌐 [Portfolio](https://vamshidev.vercel.app/)
- 📧 vamshidev254@gmail.com

---

*Built by Vamshi Vuppunutula — Full Stack Developer*
