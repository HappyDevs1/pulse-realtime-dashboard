# 🚀 Deployment Guide – Pulse Realtime Dashboard

This guide outlines how to deploy the entire infrastructure and application stack for the Pulse Realtime Collaborative Dashboard using Terraform and GitHub Actions.

---

## 🗂️ Contents

1. [Overview](#1-overview)
2. [Infrastructure Setup (Terraform)](#2-infrastructure-setup-terraform)
3. [CI/CD Pipeline (GitHub Actions)](#3-cicd-pipeline-github-actions)
4. [Environments](#4-environments)
5. [Secrets & Config](#5-secrets--config)
6. [Testing Deployment](#6-testing-deployment)
7. [Rollback Strategy](#7-rollback-strategy)

---

## 1. Overview

Your application consists of:

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite, TypeScript) |
| Backend | Node.js (Express, TypeScript) |
| ETL | Python (Lambda) |
| Infra | AWS (ECS Fargate, RDS, S3, CloudWatch, API Gateway) |
| CI/CD | GitHub Actions + Terraform |

---

## 2. Infrastructure Setup (Terraform)

### 📁 Directory Structure

```plaintext
/infra
  ├── main.tf              # Root module
  ├── variables.tf         # Input vars
  ├── outputs.tf           # Exported outputs
  ├── backend.tf           # Remote state
  ├── modules/
  │   ├── network/         # VPC, Subnets, NAT
  │   ├── compute/         # ECS Fargate + Lambda
  │   ├── storage/         # S3 + RDS (PostgreSQL + TimescaleDB)
  │   ├── security/        # IAM, SGs
  │   └── monitoring/      # CloudWatch + Alarms
```

### ✅ Deployment Steps
### Configure Backend State

```hcl
terraform {
  backend "s3" {
    bucket         = "your-tf-state-bucket"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```
### Initialize Terraform

```bash
cd infra
terraform init
```
### Set Up Environment Variables
**Use terraform.tfvars or CLI flags:**

```hcl
aws_region     = "us-east-1"
app_name       = "realtime-dashboard"
db_password    = "supersecurepass"
Deploy
```

```bash
terraform plan -out tfplan
terraform apply tfplan
```

## 3. CI/CD Pipeline (GitHub Actions)
### 🎯 Goals
**Step	Description**
✅ Lint & Test	Validate codebase
🛠 Build	Generate frontend static files
📦 Dockerize	Backend app
🚀 Deploy	Upload to S3 / Push to ECS
🧠 Infra	Apply Terraform

### 📁 GitHub Actions Workflows
```plaintext
.github/
  workflows/
    frontend.yml
    backend.yml
    terraform.yml
```
### 📄 frontend.yml

```yaml
name: Frontend Deploy

on:
  push:
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: cd frontend && npm ci && npm run build
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --delete
        env:
          AWS_S3_BUCKET: your-frontend-bucket
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
          SOURCE_DIR: frontend/dist
```
### 📄 backend.yml
```yaml
name: Backend Deploy

on:
  push:
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: cd backend && npm ci && npm run build
      - run: docker build -t realtime-backend .
      - run: aws ecr get-login-password | docker login ...
      - run: docker tag realtime-backend:latest ECR_URI
      - run: docker push ECR_URI
      - run: aws ecs update-service ...
```
### 📄 terraform.yml
```yaml
name: Terraform Infra

on:
  push:
    paths:
      - 'infra/**'

jobs:
  apply:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.6.0
      - run: cd infra && terraform init
      - run: terraform plan -out=tfplan
      - run: terraform apply -auto-approve tfplan
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```
## 4. Environments
### Use separate workspaces or folders:

dev → Feature branches

staging → Pre-prod QA

prod → Stable, public version

### Use Terraform workspaces:

```bash
terraform workspace new dev
terraform workspace select dev
```

---

## 5. Secrets & Config
### Store in GitHub Secrets:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

DATABASE_URL

JWT_SECRET

OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET

Use AWS Secrets Manager for runtime config in production.

---

## 6. Testing Deployment
### After CI/CD runs:

Verify ECS service is healthy

Open dashboard frontend URL

Test auth flow

Upload test CSV

Confirm WebSocket connections

Validate ETL results in TimescaleDB

---

## 7. Rollback Strategy
Infra: Use terraform state show and terraform apply with a previous commit

Backend: Revert image tag in ECS

Frontend: Re-deploy previous static build from backup
