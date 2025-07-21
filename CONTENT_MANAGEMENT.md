# Dynamic Content Management System

This document explains how to use the dynamic content management system implemented in the Elusive Origin project.

## Overview

The project now supports two content approaches:

1. **Static React Components** (existing): `/`, `/platform`, `/vessel`
2. **Dynamic Content System** (new): `/dynamic`, `/admin`

## Content Management Features

### Dynamic Content Page (`/dynamic`)
- Fetches content from JSON files in `/public/content/`
- Renders a responsive landing page using the fetched data
- Supports loading states and error handling
- Uses the same design system as static pages

### Admin Interface (`/admin`)
- Visual content editor for managing dynamic content
- Import/export content as JSON files
- Live preview functionality
- Form validation and error handling

## File Structure

```
public/
  content/
    home.json       # Content for dynamic coming soon page
    vessel.json     # Content for dynamic vessel page (future use)

client/src/
  hooks/
    useContent.ts   # React hook for fetching content
  pages/
    dynamic-coming-soon.tsx  # Dynamic content page
    content-admin.tsx        # Admin interface

server/
  routes.ts       # API endpoints for saving content
```

## Content Schema

### Home Content (`/public/content/home.json`)

```json
{
  "hero": {
    "title": "The Investigation Begins",
    "subtitle": "Enter a sacred container for culture, craft, and community",
    "description": "Join the mystery that shapes the story...",
    "ctaText": "Reserve Your Investigation",
    "ctaLink": "#reserve"
  },
  "event": {
    "title": "Next Event: August 2025",
    "location": "Details revealed to reserved investigators",
    "description": "An immersive cultural investigation experience",
    "countdown": true
  },
  "value_proposition": {
    "tagline": "Join the mystery. Shape the story...",
    "points": [
      "Interactive storytelling meets cultural investigation",
      "Community-driven mystery solving",
      "Authentic narratives rooted in cultural commentary"
    ]
  },
  "forms": {
    "mailerlite_form_id": "your-form-id-here",
    "reservation_enabled": true
  },
  "faq": [
    {
      "question": "When does the investigation begin?",
      "answer": "The first major event launches August 2025..."
    }
  ]
}
```

## Usage Instructions

### For Content Editors

1. **Access Admin Interface**: Navigate to `/admin`
2. **Edit Content**: Use the visual editor to modify text, links, and form IDs
3. **Import/Export**: 
   - Export current content as JSON backup
   - Import content from JSON files
4. **Preview Changes**: Click "Preview Dynamic Page" to see changes
5. **Save Changes**: Click "Save" to apply changes to the live site

### For Developers

1. **Add New Content Types**:
   ```typescript
   // Create new JSON schema in public/content/
   // Add to useContent hook
   // Create new dynamic page component
   ```

2. **Modify Content Structure**:
   ```typescript
   // Update JSON schema
   // Update TypeScript interfaces
   // Update admin interface forms
   ```

3. **Add New Editable Fields**:
   ```typescript
   // Add to content JSON
   // Add form field in content-admin.tsx
   // Add display logic in dynamic page
   ```

## API Endpoints

- `POST /api/content/:type` - Save content (where type is 'home' or 'vessel')
- `GET /content/:type.json` - Fetch content (served as static files)

## Benefits

1. **Non-Technical Editing**: Content editors can modify text without code changes
2. **Version Control**: Content changes are tracked in JSON files
3. **Backup/Restore**: Easy import/export of content configurations
4. **Preview System**: See changes before publishing
5. **Maintain React Architecture**: Keeps the benefits of component-based development

## Implementation Notes

- Uses React Query for caching and data fetching
- Maintains existing Tailwind CSS styling system
- Preserves all interactive features (smooth scrolling, animations)
- Fallback content prevents broken pages if JSON fails to load
- Server-side content saving with file system persistence

## Migration Strategy

If you want to convert existing static pages to dynamic:

1. Extract hardcoded content to JSON schema
2. Create dynamic page component using `useContent` hook
3. Add admin interface fields for new content
4. Update routing to point to dynamic version
5. Test thoroughly before switching production routes

This system provides a bridge between static React components and full CMS functionality while maintaining the project's existing architecture and design system.