# How to Update Carousel Images in CMS

## What I Fixed
✅ Updated carousel to display actual uploaded images (not just placeholders)
✅ Added fallback system - shows placeholder if image fails to load
✅ Enhanced display with image overlay showing alt text and description
✅ Maintained responsive design with proper aspect ratios

## How to Update Carousel Images

### In Your CMS (/admin):
1. **Go to Landing Page** in the content manager
2. **Scroll to "Carousel Images"** section
3. **For each carousel item**:
   - **Upload Image**: Click "Choose image" and upload (1200x600px recommended)
   - **Alt Text**: Descriptive text for the image
   - **Placeholder Description**: Backup text if image doesn't load
   - **ID**: Keep as numbers (1, 2, 3, 4)

### What Happens:
- **With Image**: Shows your uploaded image with overlay text
- **Without Image**: Shows the placeholder design with icon
- **If Image Fails**: Automatically falls back to placeholder

## Image Upload Process:
1. CMS saves images to `client/public/assets/uploads/`
2. Images are committed to your GitHub repository
3. Netlify rebuilds the site automatically
4. Updated images appear on your live site

## Testing Your Changes:
1. Upload an image in the CMS
2. Save the changes
3. Wait for Netlify rebuild (1-2 minutes)
4. Visit your live site - new images should appear in carousel
5. Images auto-rotate every 4 seconds

## Image Requirements:
- **Format**: JPG, PNG, WebP
- **Size**: 1200x600px recommended for best quality
- **File Size**: Under 5MB for fast loading

Your carousel now fully supports dynamic image updates through the CMS!