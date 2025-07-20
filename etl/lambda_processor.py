import boto3
import pandas as pd
import os
import io
import json

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # 1. Extract file info
        bucket_name = event['Records'][0]['s3']['bucket']['name']
        object_key = event['Records'][0]['s3']['object']['key']
        
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        content = response['Body'].read().decode('utf-8')
        df = pd.read_csv(io.StringIO(content))

        # 2. Clean columns
        df.columns = [col.strip().title() for col in df.columns]
        df = df[['Total', 'Cogs', 'Gross Income', 'Date', 'Time', 'Product Line', 'Payment', 'Branch']].dropna()
        df[['Total', 'Cogs', 'Gross Income']] = df[['Total', 'Cogs', 'Gross Income']].round(2)

        # 3. Convert date to month-year
        df['Date'] = pd.to_datetime(df['Date'], format='mixed')
        df['Month'] = df['Date'].dt.strftime('%b-%Y')

        # 4. Prepare output JSON structure
        final_data = {}

        for month in df['Month'].unique():
            month_df = df[df['Month'] == month]

            # Totals
            totals = month_df[['Total', 'Cogs', 'Gross Income']].sum().round(2).to_dict()

            # Product line counts
            product_counts = month_df['Product Line'].value_counts().to_dict()

            # Payment method counts
            payment_counts = month_df['Payment'].value_counts().to_dict()

            # Branch total sales
            branch_totals = month_df.groupby('Branch')['Total'].sum().round(2).to_dict()

            final_data[month] = {
                'totals': totals,
                'product_line': product_counts,
                'payment': payment_counts,
                'branch': branch_totals
            }

        # 5. Save to destination S3 bucket as JSON
        output_bucket = os.environ.get('OUTPUT_BUCKET')
        output_key = 'monthly-sales-summary.json'

        s3.put_object(
            Bucket=output_bucket,
            Key=output_key,
            Body=json.dumps(final_data),
            ContentType='application/json'
        )

        print(f"Aggregated data saved to s3://{output_bucket}/{output_key}")

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': f"Failed: {e}"
        }

    return {
        'statusCode': 200,
        'body': f"Processed {len(df)} rows and saved monthly summary to S3."
    }
