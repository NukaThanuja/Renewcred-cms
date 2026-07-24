# RenewCred CMS - Frontend Application

Built with **Next.js 16**, **React 19**, **Redux Toolkit**, **Tiptap**, and **KaTeX**.

## Overview
This directory contains the user-facing web application and the administrative CMS panel for RenewCred.

### Features
- **Public Web Pages**: Dynamic content rendering from backend APIs for `/` (Home) and dynamic `/[page]` routes.
- **Admin Dashboard**: Content CRUD, image uploads, page management, media library, user profile, and real-time dashboard analytics.
- **Rich Content & Math Engine**: Tiptap editor with tables, nested lists, code blocks, blockquotes, and KaTeX mathematical equation support.
- **State Management**: Redux Toolkit for authentication state (`authSlice`).

## Running Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

Refer to the root [README.md](../README.md) for full project setup and Docker documentation.
