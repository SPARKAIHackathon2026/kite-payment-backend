// api/index.js — Vercel Serverless 入口
// 调用时用 try/catch 包裹，避免未捕获同步异常导致 FUNCTION_INVOCATION_FAILED
import app from "../src/app.js";

export default function handler(req, res) {
  try {
    return app(req, res);
  } catch (err) {
    console.error("Handler error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, error: err?.message ?? "Internal Server Error" });
    }
  }
}