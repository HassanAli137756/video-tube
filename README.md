# 🎬 VideoTube

A full-stack video-sharing platform built with the **MERN Stack**, featuring secure authentication, video uploading, video playback, likes, comments, user profiles, activity tracking, and protected user-specific features.

VideoTube was built as a complete full-stack project to practice and demonstrate real-world **React, Express, MongoDB, JWT authentication, REST APIs, Cloudinary file management, Redux state management, and responsive UI development**.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Access token and refresh token system
* HTTP-only cookies for token storage
* Automatic access-token refresh using Axios interceptors
* Protected routes for authenticated users
* Public routes for unauthenticated users
* Automatic redirection based on authentication state
* Logout functionality

### 👤 User Profile

* View personal profile
* Update account details
* Update profile/avatar image
* View user-related statistics
* Subscriber/subscribed-channel information

### 🎥 Video Management

* Upload videos
* Upload video thumbnails
* Update video information
* Delete uploaded videos
* Publish/unpublish videos
* View personal uploaded videos
* Watch videos through a dedicated video player

### ❤️ Likes & Comments

* Like/unlike videos
* Add comments
* Display comments instantly after submission
* Delete own comments
* Track liked videos
* Track videos on which the user has commented

### 📊 User Activities

Users can access their activity-related information, including:

* Watched videos
* Liked videos
* Added comments
* Activity statistics

### ⚙️ Settings

Dedicated settings area for account-related actions:

* Update password
* Update profile information
* Update account images
* Manage account/activity-related options

### 🛡️ Protected Routing

VideoTube uses separate routing flows for authenticated and unauthenticated users.

```text
                         Layout
                            │
              ┌─────────────┴─────────────┐
              │                           │
           Public                    Protected
              │                           │
       Login / Register          Profile / Settings
                                      │
                                  My Content
                                      │
                                  Activities
                                      │
                                Other Features
```

Authenticated users cannot access login/register unnecessarily, while unauthenticated users are redirected to the login page when trying to access protected resources.

---

## 🧰 Tech Stack

### Frontend

* React
* Vite
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* HTML
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cookie Parser
* Multer

### External Services

* Cloudinary — video and image storage
* MongoDB Atlas — production database

---

## 🏗️ Architecture

VideoTube follows a client-server architecture:

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React + Vite     │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                         Axios API
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express + Node   │
                    │     Backend      │
                    └───────┬──────────┘
                            │
                ┌───────────┼────────────┐
                ▼           ▼            ▼
          ┌──────────┐ ┌──────────┐ ┌───────────┐
          │ MongoDB  │ │Cloudinary│ │   JWT     │
          │ Database │ │  Media   │ │  Auth     │
          └──────────┘ └──────────┘ └───────────┘
```

---

## 🔑 Authentication Flow

VideoTube uses an access-token + refresh-token architecture.

```text
Login
  │
  ▼
Backend validates credentials
  │
  ├── Access Token
  │
  └── Refresh Token
          │
          ▼
       HTTP-only cookies
```

When the access token expires:

```text
API Request
     │
     ▼
   401 Error
     │
     ▼
Axios Interceptor
     │
     ▼
Refresh Access Token
     │
     ▼
Retry Original Request
     │
     ▼
Return Actual Response
```

This allows users to remain authenticated without manually logging in again every time the short-lived access token expires.

---

## 🛣️ Routing Architecture

The application separates common, public, and protected routes.

```text
Layout
│
├── Home
│
├── UnAuthorizedUserLayout
│   ├── Login
│   └── Register
│
└── AuthorizedUserLayout
    ├── Profile
    ├── My Content
    ├── Upload Video
    ├── Activities
    ├── Video Player
    ├── My Videos
    ├── My Stats
    ├── Liked Videos
    ├── Commented Videos
    ├── Watched Videos
    ├── Settings
    ├── Update Password
    ├── Update Profile
    └── Update Account Images
```

Authentication state is maintained through Redux and used by the route guards to determine which routes should be accessible.

---

## 📁 Project Structure

A simplified structure of the project:

```text
VideoTube/
│
├── frontend/
│   ├── src/
│   │   ├── authServices/
│   │   ├── components/
│   │   ├── Redux/
│   │   ├── Routing/
│   │   ├── utils/
│   │   ├── vedioServices/
│   │   ├── api.js
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   │
│   └── package.json
│
└── README.md
```

> The exact folder structure may vary depending on the current version of the project.

---

## ⚙️ Environment Variables

Sensitive credentials should **never be committed to GitHub**.

### Backend

Create a `.env` file inside the backend project:

```env
PORT=3000

DB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend

For the Vite frontend:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

For production, the frontend API URL should point to the deployed backend instead of localhost.

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd VideoTube
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create the required `.env` files and provide your MongoDB, JWT, and Cloudinary credentials.

### 5. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 6. Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🔨 Production Build

For the Vite frontend:

```bash
npm run build
```

This generates the production-ready `dist` directory.

For production deployment, the frontend and backend can be hosted separately:

```text
React/Vite
    ↓
Vercel

Express/Node
    ↓
Render

MongoDB
    ↓
MongoDB Atlas

Media
    ↓
Cloudinary
```

---

## 🔒 Security Practices

VideoTube uses several security-oriented practices:

* JWT authentication
* HTTP-only cookies
* Short-lived access tokens
* Refresh tokens
* Environment variables for secrets
* Protected API routes
* Protected frontend routes
* Authentication-aware navigation
* CORS configuration
* Password hashing on the backend

> Never commit `.env` files or API secrets to a public repository.

---

## 📱 Responsive UI

The frontend is designed with responsive layouts using Tailwind CSS.

The interface adapts to:

* Desktop
* Tablet
* Mobile

Navigation also changes according to screen size, including a mobile navigation menu.

---

## 🧪 Important User Flows

### Logged-out user

```text
Open VideoTube
      ↓
Home
      ↓
Login / Register
```

Trying to access a protected page:

```text
/settings
   ↓
Authorization Check
   ↓
Not authenticated
   ↓
/login
```

### Logged-in user

```text
Login
  ↓
Home
  ↓
Profile / My Content / Activities / Settings
```

If an authenticated user manually visits:

```text
/login
```

the application can redirect the user back to Home rather than showing the login form again.

---

## 📌 Current Project Status

VideoTube is a completed full-stack learning project covering the complete development cycle from backend APIs and database operations to frontend UI, authentication, protected routing, media uploads, and production deployment preparation.

### Implemented

* [x] User authentication
* [x] JWT access/refresh token system
* [x] User profile management
* [x] Video upload
* [x] Video playback
* [x] Video update/delete
* [x] Thumbnail management
* [x] Likes
* [x] Comments
* [x] User activities
* [x] Watched videos
* [x] Liked videos
* [x] Comment history
* [x] User statistics
* [x] Settings
* [x] Protected routing
* [x] Responsive UI
* [x] Cloudinary integration
* [x] Redux authentication state
* [x] Axios token refresh flow

---

## 🎯 Purpose of the Project

VideoTube was developed as a practical full-stack project to move beyond isolated tutorials and understand how different technologies work together in a real application.

The project focuses on learning and implementing:

* REST API design
* Authentication and authorization
* Database relationships and aggregation
* File and media uploads
* Client-side state management
* API communication
* Protected routing
* Token refresh mechanisms
* Responsive UI
* Production deployment concepts

---

## 👨‍💻 Author

**Hassan Ali**

Built with React, Node.js, Express, MongoDB, Tailwind CSS, JWT, Redux Toolkit, and Cloudinary.

---

## ⭐ If You Like the Project

If you find VideoTube useful or interesting, consider giving the repository a ⭐ on GitHub.
