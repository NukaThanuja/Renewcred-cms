# RenewCred CMS - Content Management System & Public Website

A full-stack Content Management System (CMS) and public website application built with **Next.js**, **Redux Toolkit**, **Express.js**, **SQLite**, and **Docker**.

---

## 🌟 Overview & Features

RenewCred CMS is designed to enable authenticated administrators to dynamically create, edit, manage, organize, and publish website content while providing public-facing applications with real-time API-driven content.

### Key Capabilities:
- 🔐 **Authentication System**: Secure JWT-based admin login/logout with role protection and state persistence via **Redux Toolkit**.
- 📊 **Admin Dashboard**: Comprehensive dashboard metrics, analytics, media management, content management, and user profile oversight.
- ✍️ **Rich Content Engine (Tiptap + KaTeX)**: Full rich text capabilities supporting:
  - Long-form structured text & multiple paragraphs
  - Ordered and bulleted nested lists (indent/outdent)
  - Interactive HTML Tables (insert, add/remove rows and columns)
  - Mathematical equations and formulas powered by **KaTeX** (e.g. `$E = mc^2$` and block equations)
  - Blockquotes, code blocks, bold, italic, headings, and strikethrough
  - Media image uploads and file library integration
- 🌐 **Dynamic Public Website Integration**: Server and client page rendering (`/` and `/[page]`) consuming published CMS content via REST APIs.
- 🐳 **Docker Infrastructure**: Ready-to-deploy containerized stack with `docker-compose`.

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19 | SSR/Client framework for admin dashboard & public pages |
| **State Management** | Redux Toolkit | Centralized authentication and application state management |
| **Rich Editor & Math**| Tiptap, KaTeX | WYSIWYG rich text editor with LaTeX equation rendering |
| **Backend** | Express.js (Node.js) | RESTful API server handling auth, content CRUD, uploads, metrics |
| **Database** | SQLite (via `sqlite3` & `sqlite`) | File-based relational database |
| **Containerization** | Docker & Docker Compose | Multi-container orchestration for backend and frontend |

---

## 🔐 Evaluation Credentials & Seed Data

Upon starting the backend for the first time, default administrator credentials and rich seed data (including equations, tables, nested lists, and structured docs) are automatically populated into the SQLite database:

- **Admin Login Email**: `admin@gmail.com`
- **Password**: `admin123`
- **Public URL**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/login` -> `http://localhost:3000/dashboard`
- **API Base URL**: `http://localhost:5000/api`

---

## 🚀 How to Run the Application

### Option A: Using Docker Compose (Recommended)

1. Ensure **Docker Desktop** is running on your machine.
2. From the root project directory, run:
   ```bash
   docker-compose up --build
   ```
3. Access the applications:
   - Public Website: [http://localhost:3000](http://localhost:3000)
   - CMS Admin Dashboard: [http://localhost:3000/login](http://localhost:3000/login)
   - Express Backend API: [http://localhost:5000](http://localhost:5000)

---

### Option B: Running Locally (Development Mode)

#### 1. Backend Setup:
```bash
cd backend
npm install
npm run dev
```
The backend server starts on port `5000` and creates/connects to `backend/database/cms.db`.

#### 2. Frontend Setup:
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend starts on port `3000`.

---

## 📁 Repository Structure

```
renewcred-cms/
├── backend/
│   ├── config/             # DB connection & database configuration
│   ├── controllers/        # Express route handlers (auth, content, dashboard, media, upload)
│   ├── database/           # SQLite database file storage (cms.db)
│   ├── middleware/         # JWT authentication & request validation
│   ├── routes/             # API route specifications
│   ├── utils/              # Admin seeder & helper utilities
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js App Router pages (Home, [page], login, dashboard)
│   │   ├── components/     # Layout, Sidebar, RichTextEditor, RichTextRenderer, Charts
│   │   ├── redux/          # Redux Toolkit store & auth slice
│   │   └── services/       # Axios API client setup
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Multi-container orchestrator
├── .env.example            # Environment variable template
└── README.md               # Architecture documentation & setup guide
```

---

## 📡 Key API Endpoints

- `POST /api/auth/login` - Administrator login
- `GET /api/content` - Fetch all content items
- `GET /api/content/page/:page` - Fetch published content for dynamic page
- `POST /api/content` - Create content item
- `PUT /api/content/:id` - Update content item
- `DELETE /api/content/:id` - Delete content item
- `POST /api/upload` - Upload media file
- `GET /api/dashboard/stats` - Summary statistics for admin dashboard

---

## 📐 Key Architectural Decisions

1. **Decoupled API Architecture**: The Express backend operates independently from the Next.js frontend, ensuring clean separation of data processing from UI rendering.
2. **Redux Toolkit Integration**: Redux Toolkit manages application authentication state (`user`, `token`), preventing unauthorized route access via `ProtectedRoute`.
3. **Rich Content & Formula Rendering**: Content is stored with semantic HTML markups created via Tiptap. Public views process inline and block LaTeX formulas (e.g. `$E=mc^2$`) via KaTeX into accessible SVG/DOM math nodes.
4. **SQLite Relational Storage**: Portable, zero-configuration database chosen for self-contained deployment and easy seed data initialization.
