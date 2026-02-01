import app from "./server.js";

const PORT = process.env.PORT || 3001;

// For Vercel serverless functions
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Tax Agent backend running on port ${PORT}`);
  });
}
