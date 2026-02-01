import express from "express";
import routes from "./api/routes.js";

const app = express();

// CORS：本地默认 localhost:3000；生产通过 CORS_ORIGIN 配置（逗号分隔多域名）
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean)
    : [
        "https://front-end-mu-ten-40.vercel.app/",  // 生产前端
        "http://localhost:3000/",                    // 本地开发
        "http://localhost:3001/"                     // 本地后端测试
    ];


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else if (allowedOrigins.length > 0) {
    res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// 根路径健康检查（避免 Vercel 访问 / 时无路由导致异常）
app.get("/", (req, res) => {
  res.json({ ok: true, service: "kite-payment", timestamp: new Date().toISOString() });
});
app.get("/api", (req, res) => {
  res.json({ ok: true, api: "kite-payment", timestamp: new Date().toISOString() });
});

app.use("/api", routes);

// 全局错误处理：防止未捕获异常导致 Serverless 进程崩溃（FUNCTION_INVOCATION_FAILED）
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (!res.headersSent) {
    res.status(500).json({ success: false, error: err?.message ?? "Internal Server Error" });
  }
});

export default app;
