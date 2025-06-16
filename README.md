# Pulse Realtime Collaborative Data Dashboard

A fully featured, cloud-native dashboard platform designed for real-time team collaboration, KPI monitoring, and dynamic data visualization. Built for SMEs, powered by AWS, and architected with scalability and security in mind.

---

## 🧩 Tech Stack

### Frontend
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (or CRA)
- [Material UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Socket.IO Client](https://socket.io/)
- [Chart.js](https://www.chartjs.org/) or [Recharts](https://recharts.org/)
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [Socket.IO Server](https://socket.io/)
- [PostgreSQL](https://www.postgresql.org/) + [TimescaleDB](https://www.timescale.com/)
- [Redis](https://redis.io/)
- [AWS S3](https://aws.amazon.com/s3/) + [Lambda](https://aws.amazon.com/lambda/)
- [Python](https://www.python.org/) (for ETL)
- [JWT](https://jwt.io/), OAuth2 (Google/GitHub)

### Infrastructure
- AWS ECS Fargate, RDS, Lambda, API Gateway
- Terraform (Infrastructure as Code)
- GitHub Actions (CI/CD)

---

## ✨ Features

- 🔐 OAuth2 login (Google/GitHub) with JWT
- 🧑‍🤝‍🧑 Multi-user real-time collaboration via WebSockets
- 📊 Drag-and-drop dashboard builder
- 📁 CSV upload with ETL transformation
- 📈 Visualizations with Chart.js/Recharts
- 🔄 WebSocket live syncing across sessions
- 🏢 Multi-tenant orgs and access control (RBAC)
- ☁️ AWS-native deployment with full Terraform IaC
- 🧪 Full CI/CD workflow using GitHub Actions

---

## 📁 Project Structure

```plaintext
.
├── client/                # Frontend (React + Vite)
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   └── hooks/
│
├── server/                # Backend (Node.js + Express)
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── ws/
│   ├── models/
│   └── middlewares/
│
├── etl/                   # ETL Pipeline (Python)
│   └── lambda_processor.py
│
├── infra/                 # Infrastructure (Terraform)
│   ├── main.tf
│   ├── variables.tf
│   └── modules/
│
├── .github/               # GitHub Actions workflows
│   └── workflows/
├── docker-compose.yml
├── README.md
└── .env.example
```

---

## 🚀 Getting Started

1. Prerequisites
Node.js (v18+)

Docker & Docker Compose

Python 3.10+

Terraform

AWS CLI

PostgreSQL + Redis (local or containerized)

2. Setup
Clone the repo
bash
Copy
Edit
git clone https://github.com/HappyDevs1/pulse-realtime-dashboard.git
cd realtime-dashboard
Setup environment variables
bash
Copy
Edit
cp .env.example .env
### Fill in all required secrets and config values
Start local development environment
bash
Copy
Edit
### Using Docker
docker-compose up --build

### Or run manually
cd client && npm install && npm run dev
cd server && npm install && npm run dev
🛠 Environment Variables
See .env.example for all necessary environment variables for local development.

---

## 🧪 Testing
Frontend: npm test (Jest + React Testing Library)

Backend: npm test (Jest + Supertest)

End-to-End: Cypress (WIP)

---

## 🧱 Deployment (CI/CD)
This project is fully integrated with GitHub Actions and Terraform.

CI/CD Pipeline
Frontend: Lint → Build → Deploy to S3 or CloudFront

Backend: Docker → Push to ECR → Deploy to ECS

Infrastructure: terraform plan/apply via Actions

---

## 📊 ETL Pipeline
CSV uploaded to /upload

Stored in S3 raw-uploads bucket

AWS Lambda processes the file:

Cleans data

Timestamps it

Inserts to TimescaleDB via RDS Proxy

Lambda logs to CloudWatch

---

## 🔐 Authentication & Authorization

OAuth2 via Google/GitHub

JWT-based session management

Role-based access control:

admin, editor, viewer

Secure cookies + HTTPS (via CloudFront or ALB)

---

## 📦 TODO / Roadmap

 Dashboard export (PDF scheduler)

 Role management UI

 Audit logging per action

 Billing module (maybe)

 Plugin SDK for custom widgets

---

## 👨‍💻 Contributing

Contributions are welcome! Please read the CONTRIBUTING.md before opening a PR.

---

## 🧠 License

MIT License

---

## 📞 Contact

For questions, feel free to open an issue or reach out via email: happysfisomahlangu12@gmail.com
