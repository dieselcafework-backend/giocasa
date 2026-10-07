import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  mongoUri: process.env.MONGODB_URI || '',
  dbName: process.env.MONGODB_DB_NAME || 'giocasa',
  adminPasscode: process.env.ADMIN_PASSCODE || 'GIOCASA2026',
  timezone: 'Asia/Kolkata',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
