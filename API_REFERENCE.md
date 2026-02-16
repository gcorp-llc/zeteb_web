# Zeteb API Documentation

This document describes the primary API endpoints and their expected data structures for the Zeteb platform.

## Architecture Overview

The application follows a strictly service-oriented architecture. Frontend components should not make direct `fetch` calls. Instead, they must use service modules located in `features/*/api/index.ts`.

All requests are proxied through `/api/proxy/[...path]` to mask backend infrastructure.

---

## Authentication

### `POST /api/auth/login`
Authenticates a user via phone number and OTP.
- **Payload:**
  ```json
  {
    "phone": "09123456789",
    "otp": "123456"
  }
  ```
- **Response:** Session object or 401 Unauthorized.

---

## User Profile

### `GET /api/user/profile`
Retrieves the currently authenticated user's profile details.
- **Response:**
  ```json
  {
    "id": "uuid",
    "name": "Dr. Maryam Alavi",
    "role": "Dermatologist",
    "bio": "...",
    "image": "url",
    "education": [...],
    "skills": [...]
  }
  ```

### `PATCH /api/user/profile`
Updates profile information.

---

## Posts & Activity

### `GET /api/posts`
Fetches a list of posts. Can be filtered by `userId`.
- **Query Params:** `userId` (optional)
- **Response:** Array of post objects.
  ```json
  [
    {
      "id": "uuid",
      "content": "...",
      "image_url": "...",
      "author": { "name": "...", "image": "..." },
      "likes": 120,
      "comments": 5
    }
  ]
  ```

### `POST /api/posts`
Creates a new post or article.
- **Payload:**
  ```json
  {
    "content": "Post body text",
    "image_url": "optional_image_url"
  }
  ```

---

## Clinics & Centers

### `GET /api/clinics`
Fetches clinics managed by the current doctor.

---

## Appointments

### `GET /api/appointments`
Fetches user appointments (as patient or doctor).
- **Query Params:** `type` ("booked" | "requests")

---

## File Upload

### `POST /api/upload`
Standard endpoint for file uploads. Supports multipart/form-data.
- **Response:**
  ```json
  {
    "url": "https://storage.zeteb.com/..."
  }
  ```
