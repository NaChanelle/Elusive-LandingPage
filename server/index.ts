// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import cors from "cors"; // Import cors

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Use CORS for all requests, allowing cross-origin API calls

// Serve admin files for Decap CMS
app.use('/admin', express.static(path.resolve(import.meta.dirname, "..", "client", "public", "admin")));

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

// API endpoint for handling reservations
// This is added BEFORE the catch-all routes to ensure it's handled
app.post('/api/reservations', async (req, res) => {
  try {
    // Assuming insertReservationSchema is correctly defined and imported
    // You might need to adjust the import path if it's not relative to server/index.ts
    // For example: import { insertReservationSchema } from '../shared/schema';
    const { insertReservationSchema } = await import('@shared/schema'); // Dynamic import for tsx context

    const reservationData = insertReservationSchema.parse(req.body);

    // In a real application, you would save this data to a database (e.g., Firestore)
    // For now, we'll just log it and send a success response.
    console.log('Received new reservation:', reservationData);

    res.status(201).json({ message: 'Reservation received successfully!', data: reservationData });

  } catch (error) {
    console.error('Error processing reservation:', error);
    // Handle Zod validation errors specifically
    if (error && typeof error === 'object' && 'issues' in error) {
      res.status(400).json({ message: 'Validation error', errors: (error as any).issues });
    } else {
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }
});


(async () => {
  const server = await registerRoutes(app);

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

