import boto3
import pandas as pd
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):
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

    # Round money columns
    money_cols = ['Total', 'Cogs', 'Gross Income']
    remove_null_df[money_cols] = remove_null_df[money_cols].round(2)

    print(f"After Rounding Monetary Values:\n{remove_null_df.head()}")

    # Save cleaned data to CSV in-memory
    output_buffer = io.StringIO()
    remove_null_df.to_csv(output_buffer, index=False)

    cleaned_csv = output_buffer.getvalue()


    # Upload to another S3 bucket
    output_bucket = 'pulse-cleaned-bucket'

    # To avoid subfolders, use only the filename, not full object_key
    filename = object_key.split('/')[-1].replace('.csv', '_cleaned.csv')
    
    s3.put_object(Bucket=output_bucket, Key=filename, Body=cleaned_csv)

    print(f"Cleaned file saved to s3://{output_bucket}/{filename}")

    return {
        'statusCode': 200,
        'body': f"File processed and cleaned data stored at {output_bucket}/{filename}"
    }
