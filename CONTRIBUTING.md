# Contributing to Pulse Realtime Collaborative Data Dashboard

Thanks for your interest in contributing! 🚀  
Whether you're fixing a bug, proposing a new feature, or improving documentation, your contributions help move this project forward.

---

## 🧭 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Issue Guidelines](#issue-guidelines)
- [Branching Strategy](#branching-strategy)
- [Commit Style](#commit-style)
- [Pull Request Process](#pull-request-process)
- [Style Guides](#style-guides)
- [Testing](#testing)
- [Feature Suggestions](#feature-suggestions)

---

## 🧑‍⚖️ Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).  
We aim to foster a safe, collaborative, and respectful community.

---

## 🛠 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/HappyDevs1/pulse-realtime-dashboard.git
   cd realtime-dashboard
Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

Create a .env file from the example:

```bash
cp .env.example .env
```
Start development server:

Frontend:
```bash
npm run dev
```

Backend:
```bash
npm run dev
```

---

## 🐞 Issue Guidelines

Search first – Avoid duplicates. Search Issues.

Bug reports must include:

Steps to reproduce

Expected vs actual behavior

Screenshots/logs if applicable

Feature requests should include:

Use case or user story

Screens or mockups (if available)

Related components/files

---

## 🌳 Branching Strategy

We follow a simplified GitHub Flow:

**main: Production-ready**

**dev: Staging/feature testing**

**feature/xyz: All new features**

**bugfix/abc: Bug fixes***

**hotfix/*: Emergency patches***

Example:

```bash
git checkout -b feature/dashboard-export
```

## 🔤 Commit Style

We follow Conventional Commits to keep history clean.

Examples:

```bash
feat: add draggable widget support
fix: resolve WebSocket reconnect issue
docs: update README with ETL flow
```
---

## 🚀 Pull Request Process
Fork the repo → Create your branch from dev

Commit your changes using conventional commits

Add tests where applicable

Submit a pull request to dev

Describe what and why in the PR template

Wait for review — we may suggest changes


✅ A pull request will be merged only if:

It passes CI/CD

Tests (unit/integration) pass

Code coverage is maintained

It follows our architecture decisions

## 🎨 Style Guides
**Frontend**
React + TypeScript

Material UI (theme-aware)

camelCase for functions/variables

PascalCase for components

**Backend**
TypeScript

Consistent async/await usage

Folder-by-feature structure

DRY services & reusable middleware

**Python (ETL)**
PEP8 compliant

Pandas for transformation logic

Boto3 for AWS S3 interaction

---

## ✅ Testing

Please write tests for new features and bug fixes:

Frontend: React Testing Library + Jest

Backend: Supertest + Jest

E2E: Cypress (TBD)

Run all tests before submitting:

```bash
npm run test
```

---

## 💡 Feature Suggestions
We welcome ideas that fit the product vision: real-time, collaborative, data-focused tooling for SMEs.

To suggest a new feature:

Open a GitHub Issue with [FEATURE] in the title

Include a short summary and user story

Label it with enhancement

---

## 🙌 Thank You!

Your contributions help democratize access to powerful data tooling.
Let’s build something awesome together.
