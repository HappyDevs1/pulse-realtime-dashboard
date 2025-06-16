# 🔄 ETL Pipeline Documentation – Pulse Realtime Dashboard

This document describes the design, flow, and deployment of the ETL pipeline used to process uploaded datasets in the Pulse Realtime Collaborative Data Dashboard platform.

---

## 📦 Purpose

The ETL (Extract, Transform, Load) pipeline automates ingestion of CSV files uploaded by users. It ensures:
- Normalization of raw data
- Cleaning and transformation
- Storage in a time-series optimized PostgreSQL database (TimescaleDB)
- Logging of processing outcomes

---

## ⚙️ Stack & Tools

| Component | Technology |
|----------|-------------|
| Compute  | AWS Lambda (Python) |
| Storage  | Amazon S3 |
| ETL Logic | Python (pandas, boto3) |
| Output DB | PostgreSQL (TimescaleDB on RDS) |
| Monitoring | AWS CloudWatch |
| Orchestration (optional) | AWS Step Functions |

---

## 🗂 Folder Structure

```plaintext
/etl
  ├── lambda_processor.py       # Main Lambda function
  ├── requirements.txt          # Python dependencies
  ├── utils/
  │   ├── s3_utils.py           # File download helpers
  │   ├── transform_utils.py    # Data cleaning & formatting
  │   └── db_writer.py          # Postgres insert logic
  └── schema/
      └── column_mapping.json   # Expected columns/KPIs
```

---

## 🚀 Flow Overview
```plaintext
1. User uploads CSV file via frontend
2. Backend receives file and uploads it to S3 (`raw-uploads` bucket)
3. S3 triggers the Lambda ETL function
4. Lambda downloads the file, cleans & transforms it
5. Writes cleaned data to TimescaleDB (RDS)
6. Logs processing status to CloudWatch
```

---

## 🧪 Example CSV Input
```csv
timestamp,revenue,users
2024-06-01T00:00:00Z,15000,240
2024-06-01T01:00:00Z,15250,300
```

---


## 🔧 Lambda Configuration
Setting	Value
Memory	512 MB
Timeout	30 seconds
Trigger	S3 (raw-uploads)
Runtime	Python 3.11
Environment Vars	DB_URL, S3_BUCKET, TABLE_NAME

---


## 🧹 Data Transformation Steps
Download the file from S3

Validate column headers match expected schema

Clean null or malformed rows

Convert timestamps to UTC format

Reshape data into:

```json
{
  "dataset_id": "uuid",
  "timestamp": "2024-06-01T00:00:00Z",
  "kpi_name": "revenue",
  "value": 15000
}
```
Batch Insert into TimescaleDB

## 🗄 Target Table Schema (TimescaleDB)
```sql
CREATE TABLE metrics (
  id UUID PRIMARY KEY,
  dataset_id UUID,
  timestamp TIMESTAMPTZ,
  kpi_name TEXT,
  value NUMERIC
);
```

SELECT create_hypertable('metrics', 'timestamp');
📋 Example Lambda Success Log (CloudWatch)
```json
{
  "dataset_id": "123e4567-e89b-12d3-a456-426614174000",
  "rows_processed": 300,
  "status": "success",
  "duration_ms": 1420
}
```
### ❌ Error Handling
Errors are captured and logged to CloudWatch. Sample failure log:

```json
{
  "error": "Missing required 'timestamp' column",
  "dataset_id": "null",
  "status": "failed",
  "filename": "sales_data.csv"
}
```
If configured, alerts can be sent via:

SNS (email/SMS)

Slack webhook

PagerDuty

---

## 🔐 Security
Lambda IAM role has least privilege access

Files validated for MIME type before processing

All uploads are stored with S3 bucket policies (private access)

Connections to RDS are encrypted and password-protected (via Secrets Manager)

---

## 🛠️ Deployment
Using Terraform (/infra module):

```hcl
resource "aws_lambda_function" "etl" {
  function_name = "etl-csv-processor"
  handler       = "lambda_processor.lambda_handler"
  runtime       = "python3.11"
  role          = aws_iam_role.etl_lambda.arn
  timeout       = 30
  memory_size   = 512
  environment {
    variables = {
      DB_URL     = var.db_url
      S3_BUCKET  = var.raw_uploads_bucket
      TABLE_NAME = "metrics"
    }
  }
}
```

---

## 🚀 Future Improvements
Use Step Functions for chained transformation jobs

Enable versioned S3 storage

Add schema learning to infer new KPIs

Support multiple file formats (Excel, JSON)
