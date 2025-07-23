# Netlify Deployment Guide for Elusive CMS

## Prerequisites
✅ Your project is ready for deployment
✅ GitHub repository: NaChanelle/Elusive-LandingPage
✅ CMS configured with git-gateway backend

## Step-by-Step Deployment

### 1. Create Netlify Account & Connect GitHub
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify to access your repositories
4. Select your repository: `NaChanelle/Elusive-LandingPage`

### 2. Configure Build Settings
When prompted, use these settings:
```
Build command: npm run build
Publish directory: dist
```

### 3. Deploy the Site
1. Click "Deploy site"
2. Wait for the initial deployment to complete
3. Note your site URL (something like `https://amazing-site-123456.netlify.app`)

### 4. Enable Netlify Identity
1. In your Netlify site dashboard, go to **Site settings**
2. Click **Identity** in the left sidebar
3. Click **Enable Identity**
4. Under **Registration preferences**, choose "Invite only" (recommended)
5. Under **External providers**, enable **GitHub** (optional but recommended)

### 5. Enable Git Gateway
1. Still in **Identity** settings, scroll down to **Services**
2. Click **Enable Git Gateway**
3. This allows your CMS to commit directly to GitHub

### 6. Add Netlify Identity Widget
The identity widget is already configured in your project, but verify it's working:
- Visit your site at `/admin`
- You should see a login interface
- Create your admin account or login with GitHub

### 7. Invite Admin Users (if needed)
1. In Netlify Identity settings, click **Invite users**
2. Enter email addresses for people who should have CMS access
3. They'll receive invitation emails to set up accounts

## Testing Your CMS

Once deployed:
1. Go to `https://your-site.netlify.app/admin`
2. Login with your Netlify Identity account
3. Edit content in the CMS
4. Click "Publish" - changes should commit to your GitHub repo
5. Your live site should update automatically

## Troubleshooting

### "Not Found" on /admin
- Check that the build published the `admin/` folder correctly
- Verify the site rebuilt after enabling Identity

### CMS won't save changes
- Ensure Git Gateway is enabled in Netlify Identity settings
- Check that your user has the correct permissions
- Verify the repository branch (should be `main`)

### Login issues
- Make sure Identity is enabled for your site
- Try using an incognito window to clear any cached auth issues
- Check that external providers (GitHub) are configured if you want to use them

## Current Project Structure
Your project is already configured with:
- ✅ Netlify build configuration (`netlify.toml`)
- ✅ Serverless functions for API endpoints
- ✅ CMS config with git-gateway backend
- ✅ All content fields set to optional for flexibility

After deployment, your CMS will save changes directly to your GitHub repository and automatically rebuild your site!