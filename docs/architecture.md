# 🏗️ System Architecture – Pulse Realtime Collaborative Data Dashboard

This document outlines the architecture and technical design for the **Pulse Realtime Collaborative Data Dashboard**, a cloud-native platform that enables SMEs to monitor and collaborate on KPIs in real-time.

---

## ⚙️ High-Level System Overview

```plaintext
+--------------+          +-----------------+          +------------------+
|   Frontend   | <--->    |   Node.js API   | <--->    |  PostgreSQL /    |
|  (React App) | WebSock  | + WebSocket     | REST API | TimescaleDB (RDS)|
+--------------+          +-----------------+          +------------------+
       |                         |                            |
       |                         |                            |
       |                         |        +-------------+     |
       |                         +------> | Redis (Pub/ | <---+
       |                                  |  Sub Cache) |     |
       |                                  +-------------+     |
       |                         |                            |
       |                         |                            |
       |        File Upload      ↓                            ↓
       |-----------------------> Backend API --> S3 Bucket --> Lambda
                                   |                              |
                                   |        +----------------+    |
                                   +----->  | Python ETL Job |----+
                                            +----------------+
```

## 🧱 1. Frontend (React + TypeScript)
Tech Stack: React, Vite, Material UI, Redux Toolkit, Socket.IO Client, React Router

**Responsibilities:**
Display dashboards and widgets

Handle CSV upload UI

Render real-time visualizations

Manage auth sessions (JWT)

Maintain live updates via WebSockets

**Key Files:**
```bash
/client
  /components   → Charts, Tables, Filters
  /pages        → Dashboard, Login, Upload
  /services     → REST + WebSocket logic
  /store        → Redux state
  /hooks        → Custom hooks (e.g. useSocket)
````

## 🧠 2. Backend (Node.js + Express + Socket.IO)
Tech Stack: Node.js, Express, Socket.IO, TypeScript, Redis, PostgreSQL (TimescaleDB)

**esponsibilities:**
Authenticate users (OAuth2 + JWT)

Handle file uploads and store to S3

Provide REST APIs for dashboards, metrics

Manage WebSocket connections and real-time events

Call AWS Lambda for ETL on new file uploads

**Key Folders:**
```bash
/server
  /controllers    → API logic (upload, dashboards, auth)
  /routes         → Express route mappings
  /ws             → WebSocket logic (join rooms, sync edits)
  /services       → Redis, DB access, S3, Auth
  /middlewares    → JWT auth, error handling
````

## 🧪 3. ETL Pipeline (AWS Lambda + Python)
Triggered by: New file in S3 raw-uploads bucket

**Tools:** Python, pandas, boto3

**Steps:**
Reads uploaded CSV file

Cleans and normalizes data

Adds timestamp and metadata

Writes cleaned records into TimescaleDB

Logs to CloudWatch (for monitoring/debugging)

**Output:**
Ingested time-series metrics in RDS (Timescale)

Transformed datasets for dashboard usage

## 🗄 4. Database Schema
Primary DB: PostgreSQL (TimescaleDB enabled)

```plaintext
Users (id, email, name, passwordHash, org_id, role)
Organizations (id, name)
Dashboards (id, name, user_id, org_id)
Widgets (id, dashboard_id, chart_type, config_json)
Datasets (id, user_id, org_id, s3_path, created_at)
Metrics (id, dataset_id, timestamp, kpi_name, value)
Redis: Used for caching, WebSocket pub/sub events, and ephemeral sessions.
```

## 🔐 5. Authentication Flow
User logs in via OAuth (Google or GitHub)

Backend exchanges code/token → issues JWT

JWT stored in Secure HTTP-only cookies

On every request, JWT is verified → user role is checked

**RBAC Roles:**

Admin

Editor

Viewer

## 🌐 6. AWS Infrastructure (Deployed via Terraform)
**Services Used:**
Component	Service
API Hosting	ECS Fargate
ETL Processing	AWS Lambda
File Storage	S3 (raw-uploads, processed-data)
DB	RDS PostgreSQL + TimescaleDB
Caching	Redis (ElastiCache or local dev)
Logging	CloudWatch
Secrets	AWS Secrets Manager
TLS	AWS ACM
Networking	VPC, Load Balancer, NAT Gateway
CI/CD	GitHub Actions
Domain Routing	Route53

## 🔄 7. Real-time Collaboration Flow
```plaintext
1. User opens Dashboard → WebSocket connects
2. Socket joins a room based on dashboard ID
3. User edits a widget (e.g., resizes, changes config)
4. Socket emits `widget:updated` event
5. Server broadcasts update to all clients in the room
6. Clients receive update → re-render updated widget
```

## 📈 8. Data Flow Summary
```plaintext
1. User uploads CSV → Backend → S3
2. S3 triggers Lambda → ETL processes file
3. Cleaned data written to TimescaleDB
4. User configures chart → selects dataset + KPIs
5. Chart renders live using React + Chart.js
6. Edits sync via WebSocket
```

## ✅ 9. CI/CD & Deployment Flow
**GitHub Actions handles:**

Frontend: Build → Deploy to S3 or CloudFront

Backend: Dockerize → Push to ECR → Deploy to ECS

Terraform: Plan + Apply AWS Infra changes

**Monitoring:**

CloudWatch Alarms

Sentry (optional)

Slack/Webhook notifications (optional)

## 📌 Appendix
client/README.md: Frontend-specific setup

server/README.md: Backend-specific setup

etl/lambda_processor.py: ETL logic

infra/main.tf: Terraform root module
