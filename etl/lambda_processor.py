import boto3
import pandas as pd
import io

s3 = boto3.client('s3')

def pulse_lambda_handler(event, context):
    pd.options.mode.chained_assignment = None  # default='warn'
    
    # Get bucket and file details from event
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    object_key = event['Records'][0]['s3']['object']['key']
    
    print(f"Processing file: {object_key} from bucket: {bucket_name}")

    # Read CSV file from S3
    response = s3.get_object(Bucket=bucket_name, Key=object_key)
    content = response['Body'].read().decode('utf-8')
    df = pd.read_csv(io.StringIO(content))

    # Standardization
    df.columns = [col.strip().title() for col in df.columns]
    print(f"Standardized Columns: {df.columns.tolist()}")

    # Filtering out important columns
    important_cols = ['Total', 'Cogs', 'Gross Income', 'Date', 'Time', 'Product Line', 'Payment', 'Branch']
    important = df[important_cols].copy()
    print(f"Important Columns Head:\n{important.head()}")

    # Removing null values
    remove_null_df = important.dropna()
    print(f"After Removing Nulls:\n{remove_null_df.head()}")

    # Group total by day
    df['Date'] = pd.to_datetime(df['Date'])
    daily_revenue = df.groupby(df['Date'].dt.date)['Total'].sum().reset_index()
    daily_revenue.columns = ['Date', 'Daily_Total']

    # Group by Product Line
    category_revenue = df.groupby('Product Line')['Total'].sum().reset_index().sort_values(by='Total', ascending=False)
    category_revenue.columns = ['Product_Line', 'Total_Revenue']

    # Profit margin percentage
    total_revenue = df['Total'].sum()
    total_profit = df['Gross Income'].sum()
    profit_margin_percent = (total_profit / total_revenue) * 100

    # Payment classification
    payment_distribution = df['Payment'].value_counts().reset_index()
    payment_distribution.columns = ['Payment_Method', 'Count']

    # Branch Revenue
    branch_revenue = df.groupby('Branch')['Total'].sum().reset_index()
    branch_revenue.columns = ['Branch', 'Total_Revenue']

    # Combine results into a single DataFrame (or save them separately if needed)
    summary_df = pd.DataFrame({
        'Total_Revenue': [total_revenue],
        'Total_Profit': [total_profit],
        'Profit_Margin(%)': [profit_margin_percent]
    })

    # Save processed DataFrames to CSV in-memory
    output_buffer = io.StringIO()

    # Example: Concatenate everything vertically, or save them separately
    output_buffer.write("=== Daily Revenue ===\n")
    daily_revenue.to_csv(output_buffer, index=False)
    
    output_buffer.write("\n=== Category Revenue ===\n")
    category_revenue.to_csv(output_buffer, index=False)

    output_buffer.write("\n=== Payment Distribution ===\n")
    payment_distribution.to_csv(output_buffer, index=False)

    output_buffer.write("\n=== Branch Revenue ===\n")
    branch_revenue.to_csv(output_buffer, index=False)

    output_buffer.write("\n=== Summary ===\n")
    summary_df.to_csv(output_buffer, index=False)

    # Upload the new CSV to another S3 bucket
    output_bucket = 'pulse-cleaned-bucket'
    output_key = f"{object_key.replace('.csv', '_cleaned.csv')}"

    s3.put_object(Bucket=output_bucket, Key=output_key, Body=output_buffer.getvalue())

    print(f"Cleaned file saved to s3://{output_bucket}/{output_key}")

    return {
        'statusCode': 200,
        'body': f"File processed and cleaned data stored at {output_bucket}/{output_key}"
    }
