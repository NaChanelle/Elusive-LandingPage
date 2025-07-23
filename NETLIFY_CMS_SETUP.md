# Enable CMS Login for Your Netlify Site

Great news! Your site is live at https://lighthearted-pony-bfe03b.netlify.app

## To Enable CMS Login:

### Step 1: Enable Netlify Identity
1. Go to your Netlify site dashboard
2. Click **Site settings** (in the top navigation)
3. In the left sidebar, click **Identity**
4. Click **Enable Identity**

### Step 2: Configure Identity Settings
Once Identity is enabled:
1. Under **Registration preferences**, select:
   - **Open** (anyone can register) OR
   - **Invite only** (you control who can access)
2. Under **External providers** (optional):
   - Enable **GitHub** if you want to login with GitHub
   - Enable **Google** if you want to login with Google

### Step 3: Enable Git Gateway
1. Still in the **Identity** section
2. Scroll down to **Services**
3. Click **Enable Git Gateway**
4. This allows the CMS to save changes directly to your GitHub repo

### Step 4: Create Your Admin Account
**Option A: If you chose "Open" registration:**
1. Go to `https://lighthearted-pony-bfe03b.netlify.app/admin`
2. Click "Sign up" and create your account
3. Check your email and confirm your account

**Option B: If you chose "Invite only":**
1. In Netlify Identity settings, click **Invite users**
2. Enter your email address
3. Check your email for the invitation
4. Follow the link to set up your account

### Step 5: Test Your CMS
1. Go to `https://lighthearted-pony-bfe03b.netlify.app/admin`
2. Login with your new account
3. You should see all your content pages ready to edit!
4. Make a test change and publish - it should commit to your GitHub repo

## Current CMS Features:
- ✅ Landing Page content editing
- ✅ Coming Soon page editing  
- ✅ Vessel teaser page editing
- ✅ All fields are optional for easy updates
- ✅ Direct GitHub integration
- ✅ Automatic site rebuilds when you publish changes

Your CMS will be fully functional once Identity is enabled!