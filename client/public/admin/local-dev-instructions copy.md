# Local Development CMS Setup

## Current Status
Your CMS is set to `test-repo` backend which allows local testing without authentication.

## How to Use:
1. Go to `/admin` - no login required
2. Edit content in the CMS interface
3. Changes are stored temporarily in browser memory
4. To save changes to your actual website:
   - Manually copy the updated content to the JSON files in `client/public/assets/content/`

## JSON Content Files:
- Landing page: `client/public/assets/content/landing.json`
- Coming soon: `client/public/assets/content/coming-soon.json`  
- Vessel page: `client/public/assets/content/vessel.json`

## For Production Deployment:
When you're ready to deploy to Netlify with real GitHub integration:

1. Change config.yml backend to:
```yaml
backend:
  name: git-gateway
  branch: main
```

2. Deploy to Netlify
3. Enable Identity in Netlify site settings
4. Enable Git Gateway in Netlify site settings
5. The CMS will then save directly to your GitHub repo

## Current Workflow:
CMS (preview) → Manual copy → JSON files → Live website