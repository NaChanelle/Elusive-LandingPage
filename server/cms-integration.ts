import express from "express";
import fs from "fs";
import path from "path";

export function setupCMSIntegration(app: express.Express) {
  // Decap CMS Proxy Backend - handles all CMS operations
  // Get entries for a collection
  app.get("/api/decap/entries/:collection", async (req, res) => {
    try {
      const { collection } = req.params;
      const contentDir = path.join(process.cwd(), "client/public/assets/content");
      
      if (collection === "pages") {
        const files = ["landing.json", "coming-soon.json", "vessel.json"];
        const entries = files.map(file => {
          const filePath = path.join(contentDir, file);
          if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
            const slug = file.replace('.json', '');
            return {
              slug,
              path: file,
              data: content,
              file: { path: file }
            };
          }
          return null;
        }).filter(Boolean);
        
        res.json(entries);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("CMS get entries error:", error);
      res.status(500).json({ error: "Failed to get entries" });
    }
  });

  // Get a specific entry
  app.get("/api/decap/entries/:collection/:slug", async (req, res) => {
    try {
      const { collection, slug } = req.params;
      
      if (collection === "pages") {
        const fileMap: { [key: string]: string } = {
          'landing': 'landing.json',
          'coming_soon': 'coming-soon.json',
          'vessel_teaser': 'vessel.json'
        };
        
        const fileName = fileMap[slug] || `${slug}.json`;
        const filePath = path.join(process.cwd(), "client/public/assets/content", fileName);
        
        if (fs.existsSync(filePath)) {
          const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
          res.json({
            slug,
            path: fileName,
            data: content,
            file: { path: fileName }
          });
        } else {
          res.status(404).json({ error: "Entry not found" });
        }
      } else {
        res.status(404).json({ error: "Collection not found" });
      }
    } catch (error) {
      console.error("CMS get entry error:", error);
      res.status(500).json({ error: "Failed to get entry" });
    }
  });

  // Update/Create an entry (this is called when you publish in Decap CMS)
  app.put("/api/decap/entries/:collection/:slug", async (req, res) => {
    try {
      const { collection, slug } = req.params;
      const { data } = req.body;
      
      console.log(`Decap CMS publishing ${slug} in ${collection}:`, Object.keys(data || {}));
      
      if (collection === "pages") {
        const fileMap: { [key: string]: string } = {
          'landing': 'landing.json',
          'coming_soon': 'coming-soon.json',
          'vessel_teaser': 'vessel.json'
        };
        
        const fileName = fileMap[slug] || `${slug}.json`;
        const filePath = path.join(process.cwd(), "client/public/assets/content", fileName);
        
        // Create backup before updating
        const backupPath = `${filePath}.backup`;
        if (fs.existsSync(filePath)) {
          fs.copyFileSync(filePath, backupPath);
          console.log(`Backup created: ${fileName}.backup`);
        }
        
        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write new content (data should be the complete content from CMS)
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        console.log(`✅ Successfully updated ${fileName} via Decap CMS publish`);
        console.log(`Changes will appear immediately on the website frontend`);
        
        res.json({
          slug,
          path: fileName,  
          data,
          file: { path: fileName }
        });
      } else {
        res.status(400).json({ error: "Invalid collection" });
      }
    } catch (error) {
      console.error("CMS update entry error:", error);
      res.status(500).json({ error: "Failed to update entry", details: error.message });
    }
  });

  // POST version for compatibility
  app.post("/api/decap/entries/:collection/:slug", async (req, res) => {
    // Redirect to PUT handler
    req.method = 'PUT';
    return app._router.handle(req, res);
  });

  // Handle CMS content updates via webhook or API
  app.post("/api/cms/update", async (req, res) => {
    try {
      console.log("CMS update request:", req.body);
      
      const { page, data } = req.body;
      
      if (!page || !data) {
        return res.status(400).json({ error: "Page and data are required" });
      }
      
      // Map page names to file names
      const pageFileMap: { [key: string]: string } = {
        'landing': 'landing',
        'coming_soon': 'coming-soon', 
        'vessel_teaser': 'vessel',
        'unknown': 'landing' // Default fallback
      };
      
      const fileName = pageFileMap[page] || page;
      const filePath = path.join(process.cwd(), "client/public/assets/content", `${fileName}.json`);
      
      // Read existing content first
      let existingData = {};
      if (fs.existsSync(filePath)) {
        const existingContent = fs.readFileSync(filePath, "utf8");
        existingData = JSON.parse(existingContent);
      }
      
      // Create backup before making changes
      const backupPath = path.join(process.cwd(), "client/public/assets/content", `${fileName}.json.backup`);
      if (fs.existsSync(filePath)) {
        fs.copyFileSync(filePath, backupPath);
      }
      
      // Merge new data with existing data (only update provided fields)
      const updatedData = { ...existingData, ...data };
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write updated content
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      
      console.log(`Updated ${fileName}.json with:`, Object.keys(data));
      
      res.json({ 
        success: true, 
        message: `${fileName} content updated successfully`,
        updatedFields: Object.keys(data),
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error("CMS update error:", error);
      res.status(500).json({ error: "Failed to update content", details: error.message });
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
  
  // Rollback functionality
  app.post("/api/cms/rollback", async (req, res) => {
    try {
      const { page } = req.body;
      
      if (!page) {
        return res.status(400).json({ error: "Page is required" });
      }
      
      const pageFileMap: { [key: string]: string } = {
        'landing': 'landing',
        'coming_soon': 'coming-soon', 
        'vessel_teaser': 'vessel',
        'unknown': 'landing'
      };
      
      const fileName = pageFileMap[page] || page;
      const filePath = path.join(process.cwd(), "client/public/assets/content", `${fileName}.json`);
      const backupPath = path.join(process.cwd(), "client/public/assets/content", `${fileName}.json.backup`);
      
      if (fs.existsSync(backupPath)) {
        // Restore from backup
        const backupContent = fs.readFileSync(backupPath, "utf8");
        fs.writeFileSync(filePath, backupContent);
        
        res.json({ 
          success: true, 
          message: `${fileName} content rolled back successfully`,
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(404).json({ error: "No backup found to rollback to" });
      }
      
    } catch (error) {
      console.error("CMS rollback error:", error);
      res.status(500).json({ error: "Failed to rollback content" });
    }
  });
}