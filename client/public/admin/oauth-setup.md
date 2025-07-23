# GitHub OAuth Setup for Decap CMS

To use Decap CMS with GitHub authentication, you need to set up a GitHub OAuth App:

## Steps:

1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: "Elusive CMS"
   - Homepage URL: Your deployed site URL (e.g., https://your-site.netlify.app)
   - Authorization callback URL: https://api.netlify.com/auth/done
4. Click "Register application"
5. Copy the Client ID and Client Secret

## For Netlify deployment:
1. In your Netlify site settings, go to Site settings > Access control > OAuth
2. Install the GitHub provider
3. Enter your GitHub OAuth app's Client ID and Client Secret

## Alternative: Use Git Gateway
Instead of direct GitHub OAuth, you can use Netlify's Git Gateway which handles authentication automatically.

Change your config.yml backend to:
```yaml
backend:
  name: git-gateway
  branch: main
```

This requires deploying to Netlify and enabling Identity + Git Gateway in your Netlify site settings.