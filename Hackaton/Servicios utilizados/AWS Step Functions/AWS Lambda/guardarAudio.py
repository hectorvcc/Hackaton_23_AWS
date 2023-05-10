import boto3
from botocore.exceptions import ClientError


def create_presigned_url(bucket_name, object_name, expiration=3600):
    
    """Generate a presigned URL to share an S3 object

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response
    
def handler(event, context):
    print(event)
    
    # Instaciamos los servicios 
    polly_client = boto3.client('polly')
    s3_client = boto3.client('s3')
    
    # Variables 
    bucket_name = 'audioscompra'
    object_key = 'audio_nuevo.mp3'
    text= " ".join(event)
    
    response = polly_client.synthesize_speech(VoiceId='Luc',
                    OutputFormat='mp3', 
                    Text = text,
                    Engine = 'neural')
    
    file = open('/tmp//speech.mp3', 'wb')
    file.write(response['AudioStream'].read())
    file.close()
    file = open('/tmp//speech.mp3','rb')
    
    
    # Subida del objeto a S3
    s3_client.put_object(Bucket=bucket_name, Key=object_key, Body=file)
    file.close()
    
    url = create_presigned_url(bucket_name, object_key)

    # The response contains the presigned URL
    return url

