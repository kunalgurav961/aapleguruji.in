import express from 'express'
import cors from 'cors'
import authRouter from '../routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
import bookingRouter from '../routes/bookingRoutes.js'
import adminRouter from "../routes/adminRoutes.js";
import publicRouter from "../routes/publicRoutes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
const app = express();
const uploadDirectory = fileURLToPath(new URL("../uploads/", import.meta.url));

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  }),
);

// apis 
app.get('/', (req, res) => {
    res.send("server is reachable")
})

// router
app.use("/api/uploads", express.static(uploadDirectory, { fallthrough: false }));
app.use('/api/auth/', authRouter)
app.use('/api/booking/', bookingRouter)
app.use('/api/public/', publicRouter)
app.use('/api/admin/', adminRouter)

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    message: "Something went wrong. Please try again.",
  });
});
export default app;
