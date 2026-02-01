// src/app.js
import app from "./server.js";

const PORT = process.env.PORT || 3001;

// 本地开发时启动服务器
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Tax Agent backend running on port ${PORT}`);
    });
}

// 导出给 Vercel 使用
export default app;