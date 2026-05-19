import 'dotenv/config';

export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 5003,
    DATABASE_URL: process.env.DATABASE_URL,
}