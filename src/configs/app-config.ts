import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    accessKey: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    bucketName: process.env.BUCKET_NAME,
    region: process.env.REGION,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRE_TIME || '1h'
};