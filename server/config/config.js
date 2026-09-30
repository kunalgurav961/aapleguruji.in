import dotenv from 'dotenv'
dotenv.config();

const config = {
  port: process.env.PORT || process.env.port || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  isProduction: process.env.NODE_ENV === "production",
};

export default config
