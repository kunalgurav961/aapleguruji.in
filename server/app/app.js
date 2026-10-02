import express from 'express'
import cors from 'cors'
import authRouter from '../routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
import bookingRouter from '../routes/bookingRoutes.js'
import adminRouter from "../routes/adminRoutes.js";
const app = express();

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
app.use('/api/auth/', authRouter)
app.use('/api/booking/', bookingRouter)
app.use('/api/admin/', adminRouter)

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    message: "Something went wrong. Please try again.",
  });
});
export default app;
