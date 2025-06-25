# 📡 REST API Documentation – Pulse Realtime Dashboard

This document describes the RESTful API endpoints available for interacting with the backend server of the Pulse Realtime Collaborative Data Dashboard.

---

## 🛠️ Base URL

For local development:

http://localhost:4000/api

```yaml

In production:

https://api.customdomain.com/api

```

---

## 🔐 Authentication

All protected endpoints require a valid **JWT** in the `Authorization` header.

Authorization: Bearer <access_token>

yaml
Copy
Edit

Login and registration are handled via **OAuth2** with Google or GitHub.

---

## 📘 Table of Contents

1. [Auth Routes](#1-auth-routes)
2. [User Routes](#2-user-routes)
3. [Organization Routes](#3-organization-routes)
4. [Dashboard Routes](#4-dashboard-routes)
5. [Dataset & Upload Routes](#5-dataset--upload-routes)
6. [Metric Routes](#6-metric-routes)

---

## 1. Auth Routes

### `GET /auth/google`
Initiate Google OAuth2 flow.

---

### `GET /auth/github`
Initiate GitHub OAuth2 flow.

---

### `POST /auth/logout`
Logs out the current user.

```yaml
Response: { "message": "Logged out successfully" }
```

### `GET /auth/me`
Returns current authenticated user.

```json
{
  "id": "user123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "editor"
}
```

---

## 2. User Routes
### `GET /users/me`
Returns user profile.

### `PATCH /users/me`
Update current user profile.

```json
{
  "name": "New Name"
}
```
---

## 3. Organization Routes
### `POST /organizations`
Create a new organization.

```json
{
  "name": "Startup Org"
}
```
### `GET /organizations`
List all organizations user belongs to.

## `POST /organizations/:orgId/invite`
Invite a teammate by email.

```json
{
  "email": "teammate@example.com",
  "role": "viewer"
}
```

---

## 4. Dashboard Routes
### `GET /dashboards`
Get list of user dashboards.

### `POST /dashboards`
Create new dashboard.

```json
{
  "name": "Marketing Dashboard",
  "org_id": "org123"
}
```

### `GET /dashboards/:id`
Get a single dashboard by ID.

### `PATCH /dashboards/:id`
Update dashboard settings or layout.

### `DELETE /dashboards/:id`
Delete a dashboard.

## 5. Dataset & Upload Routes
### `POST /datasets/upload`
Upload a new CSV file.

**Headers:**

```bash
Content-Type: multipart/form-data
```
**Body:**

file: (CSV File)

org_id: string

### `GET /datasets`
List datasets for user/org.

### `GET /datasets/:id`
View metadata for specific dataset.

---

## 6. Metric Routes
### `GET /metrics/:datasetId`
Get time-series metrics for a dataset.

**Query Parameters (maybe):**

kpi: Filter by KPI name

from: Start timestamp

to: End timestamp

Example Response
```json
[
  {
    "timestamp": "2024-06-15T12:00:00Z",
    "kpi_name": "Revenue",
    "value": 9200.5
  },
  {
    "timestamp": "2024-06-15T13:00:00Z",
    "kpi_name": "Revenue",
    "value": 9501.75
  }
]
```
### ⛔ Error Format
**All errors follow a standard structure:**

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 401
  }
}
```

## 🧪 Testing
Use Postman or Insomnia

Make sure JWT is added to headers

Upload CSV files with proper MIME type
