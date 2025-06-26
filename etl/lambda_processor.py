import boto3
import pandas as pd
import psycopg2
import os
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):
    conn = None
    cur = None
    
    try:
        # Extract bucket details
        bucket_name = event['Records'][0]['s3']['bucket']['name']
        object_key = event['Records'][0]['s3']['object']['key']
        
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        content = response['Body'].read().decode('utf-8')
        df = pd.read_csv(io.StringIO(content))

        df.columns = [col.strip().title() for col in df.columns]
        df = df[['Total', 'Cogs', 'Gross Income', 'Date', 'Time', 'Product Line', 'Payment', 'Branch']].dropna()

        # Round money columns
        df['Total'] = df['Total'].round(2)
        df['Cogs'] = df['Cogs'].round(2)
        df['Gross Income'] = df['Gross Income'].round(2)

        # DB Connection
        conn = psycopg2.connect(
            host=os.environ['DB_HOST'],
            dbname=os.environ['DB_NAME'],
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASS'],
            port=os.environ.get('DB_PORT', '5432')
        )
        cur = conn.cursor()

        insert_query = """
            INSERT INTO sales_data (total, cogs, gross_income, date, time, product_line, payment, branch)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        for _, row in df.iterrows():
            cur.execute(insert_query, (
                row['Total'],
                row['Cogs'],
                row['Gross Income'],
                row['Date'],
                row['Time'],
                row['Product Line'],
                row['Payment'],
                row['Branch']
            ))

        conn.commit()
        print(f"Inserted {len(df)} rows successfully.")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

    return {
        'statusCode': 200,
        'body': f"{len(df)} rows processed and inserted."
    }
