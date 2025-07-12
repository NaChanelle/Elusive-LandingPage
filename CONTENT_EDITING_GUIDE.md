# Content Editing Guide for Elusive Origin

## Quick Start
1. Go to `/admin/content` in your Replit app
2. Edit your content in the user-friendly interface
3. Click "Copy All" to get the updated content
4. Replace the content in `shared/content.ts` with the copied version

## How It Works

### Content Editor Interface
- **Brand Tab**: Edit your main brand name, tagline, and description
- **Coming Soon Tab**: Edit hero section, countdown text, and call-to-action buttons
- **Vessel Tab**: Edit all Vessel app page content including features and descriptions
- **Advanced Tab**: Edit raw JSON for complete control

### Making Changes
1. **Navigate to Content Editor**: Visit `https://your-replit-url.com/admin/content`
2. **Edit Content**: Use the tabbed interface to edit different sections
3. **Export Changes**: Click "Copy All" or "Export" to get the updated content
4. **Apply Changes**: Replace the content in `shared/content.ts`

### For WordPress Integration
Since you're using this with WordPress, here's the workflow:

1. **Edit in Replit**: Use the content editor to make changes
2. **Copy Content**: Export the updated content.ts file
3. **Update WordPress**: Replace the content in your WordPress PHP template with the exported data
4. **Regenerate Static HTML**: Use your WordPress theme to regenerate the static HTML

## File Structure

```
shared/
├── content.ts          # Main content file (edit this)
├── schema.ts          # Database schema (don't edit)

client/src/pages/
├── content-editor.tsx  # Content editing interface
├── coming-soon.tsx     # Coming soon page
├── vessel-teaser.tsx   # Vessel app page
└── landing.tsx         # Main platform page
```

## Content Structure

### Brand Information
- `brand.name`: Your brand name
- `brand.tagline`: Main tagline
- `brand.description`: Brand description

### Coming Soon Page
- `comingSoon.hero.title`: Main hero title
- `comingSoon.hero.subtitle`: Hero subtitle
- `comingSoon.hero.description`: Hero description
- `comingSoon.hero.ctaButton`: Button text

### Vessel Page
- `vessel.hero.title`: Vessel page title
- `vessel.hero.subtitle`: Vessel page subtitle
- `vessel.hero.description`: Vessel page description
- `vessel.mvpFeatures.*`: MVP features content
- `vessel.earlyAccess.*`: Early access content

## Tips for Easy Editing

1. **Use the Visual Interface**: The tabs make it easy to find specific content
2. **Export Regularly**: Save your changes by exporting the content file
3. **Test Changes**: Preview your changes in the Replit environment first
4. **Keep Backups**: Save copies of your content.ts file before making major changes

## Advanced Usage

### Custom Content Fields
You can add new content fields by editing the JSON directly in the "Advanced" tab:

```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "New section description"
  }
}
```

### Using Content in Components
To use content in your React components:

```typescript
import { siteContent } from "@shared/content";

// Use in component
<h1>{siteContent.brand.name}</h1>
<p>{siteContent.comingSoon.hero.description}</p>
```

## Troubleshooting

### Content Not Updating
- Make sure you've updated the `shared/content.ts` file
- Check that you've copied the complete exported content
- Restart your development server if needed

### JSON Errors
- If editing raw JSON, make sure it's valid JSON format
- Use the visual tabs instead of advanced editing if you're unsure
- Check for missing commas or brackets

### Missing Content
- All content should be defined in the content.ts file
- Check the console for any undefined content errors
- Make sure you're importing content correctly in components

---

**Need Help?** The content editor is designed to be simple and intuitive. If you run into any issues, check the console for error messages or refer to this guide.