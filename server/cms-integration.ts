import express from "express";
import fs from "fs";
import path from "path";

export function setupCMSIntegration(app: express.Express) {
  // Handle CMS content updates via webhook or API
  app.post("/api/cms/update", async (req, res) => {
    try {
      const { page, data } = req.body;
      
      if (!page || !data) {
        return res.status(400).json({ error: "Page and data are required" });
      }
      
      const filePath = path.join(process.cwd(), "client/public/assets/content", `${page}.json`);
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write updated content
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
      res.json({ 
        success: true, 
        message: `${page} content updated successfully`,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error("CMS update error:", error);
      res.status(500).json({ error: "Failed to update content" });
    }
  });
  
  // Get current content for a page
  app.get("/api/cms/content/:page", async (req, res) => {
    try {
      const { page } = req.params;
      const filePath = path.join(process.cwd(), "client/public/assets/content", `${page}.json`);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Page not found" });
      }
      
      const content = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(content);
      
      res.json({
        page,
        data,
        lastModified: fs.statSync(filePath).mtime
      });
      
    } catch (error) {
      console.error("CMS content get error:", error);
      res.status(500).json({ error: "Failed to get content" });
    }
  });
}