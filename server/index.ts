import express, { type Request, Response, NextFunction } from "express";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve admin files for Decap CMS
app.use('/admin', express.static(path.resolve(import.meta.dirname, "..", "client", "public", "admin")));

// MailerLite API endpoint
app.post('/api/subscribe', async (req: Request, res: Response) => {
  try {
    const { email, formId } = req.body;
    
    if (!email || !formId) {
      return res.status(400).json({ error: 'Email and formId are required' });
    }

    const apiToken = process.env.MAILERLITE_API_TOKEN;
    if (!apiToken) {
      return res.status(500).json({ error: 'MailerLite API token not configured' });
    }

    // Submit to MailerLite API using subscribers endpoint
    const response = await fetch(`https://api.mailerlite.com/api/v2/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiToken
      },
      body: JSON.stringify({
        email,
        type: 'active'
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.log('MailerLite API error:', response.status, errorData);
      return res.status(response.status).json({ error: 'Failed to subscribe' });
    }

    const data = await response.json();
    res.json({ success: true, data });

  } catch (error) {
    console.error('Subscribe endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Create server without API routes - using only MailerLite forms
  const { createServer } = await import("http");
  const server = createServer(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
