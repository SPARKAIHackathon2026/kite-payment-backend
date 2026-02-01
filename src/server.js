import express from "express";
import routes from "./api/routes.js";

const app = express();

// CORS 配置：允许前端访问
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://front-end-mu-ten-40.vercel.app",
    "http://localhost:3000",
    "https://kite-payment-backend.vercel.app"
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  }
  
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());
app.use("/api", routes);

export default app;
