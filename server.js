import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Enable gzip/compression header if available, disable x-powered-by
app.disable('x-powered-by');

// Serve static assets from dist
if (fs.existsSync(distPath)) {
  // Cache static assets
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
    index: false
  }));

  // Handle SPA fallback for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Website Loading</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #1e293b; }
            .card { background: white; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 480px; text-align: center; }
            code { background: #e2e8f0; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Building Application</h2>
            <p>The application bundle has not been generated yet. Please run <code>npm run build</code> in your terminal or hosting dashboard.</p>
          </div>
        </body>
      </html>
    `);
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Node.js server listening on http://0.0.0.0:${PORT}`);
});
