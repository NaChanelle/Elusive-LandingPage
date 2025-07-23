# Elusive Origin - Cultural Investigation Platform

## Overview

Elusive Origin is a full-stack web application that serves as a "sacred container for culture, craft, and community." It's designed as an immersive cultural investigation platform where users can reserve access to upcoming events and participate in collaborative storytelling experiences. The application features a mysterious, investigation-themed interface with a sophisticated landing page and reservation system.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

- **Frontend**: React-based SPA with TypeScript
- **Backend**: Node.js/Express server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Replit-optimized with autoscale deployment target

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **API Design**: RESTful endpoints for reservation management
- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage
- **Development**: Custom Vite integration for hot reloading

### Database Schema
The application uses two main entities:
- **Users**: Basic user authentication with username/password
- **Reservations**: Event reservation system with investigation interests and role preferences

### UI Components
The application features a comprehensive component library built on shadcn/ui including:
- Landing page sections (Hero, Vessel Preview, Event Teaser, Access Tiers)
- Navigation with smooth scrolling
- Form components with validation
- Toast notifications
- Responsive design patterns

## Data Flow

1. **User Registration**: Users fill out reservation forms with investigation interests and preferred roles
2. **Validation**: Client-side validation using Zod schemas shared between frontend and backend
3. **API Processing**: Express routes handle reservation creation with duplicate email checking
4. **Database Storage**: Drizzle ORM manages PostgreSQL interactions
5. **Response Handling**: Success/error states communicated via toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **react-hook-form**: Form state management
- **zod**: Schema validation

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Production bundling

## Deployment Strategy

The application is configured for Replit deployment with:
- **Development**: `npm run dev` runs both frontend and backend in development mode
- **Build Process**: Vite builds the frontend, ESBuild bundles the backend
- **Production**: Single Node.js process serving both API and static files
- **Database**: PostgreSQL 16 module enabled in Replit environment
- **Port Configuration**: Backend runs on port 5000, exposed on port 80

The deployment uses Replit's autoscale target for automatic scaling based on demand.

## Vessel App Features (Future Implementation)

The companion mobile app will include:
- **Event Hub**: Event details, character rosters, cultural lore vault
- **Investigation Log**: Chronological clue feed with timestamps and visual clues
- **Community Theories**: Interactive discussion board for sharing theories
- **Welcome Overlay**: First-time user onboarding experience
- **Mobile-responsive**: Afro-Futuristic aesthetic with Inter font
- **Real-time Features**: Live clue drops and community engagement

## Elusive Ecosystem Structure

The ecosystem now features a complete user journey from first visit to community engagement:

### Coming Soon Landing Page (/)
- **Primary Entry Point**: Simplified first visitor experience focused on lead capture
- **Event-Focused Hero**: "The Investigation Begins" messaging highlighting August 2025 launch
- **Pulsing Elusive Logo**: Square animated branding matching website design
- **Countdown Timer**: Live countdown to August 2025 event creating urgency
- **Minimal Navigation**: Header logo only, no competing navigation elements
- **Primary CTA**: "Reserve Your Investigation" email signup form
- **FAQ Section**: Three key questions about event timing, Vessel app, and pricing
- **Protected Access**: Platform and Vessel app require signup to access
- **Footer**: Copyright, contact, privacy/terms, and subtle social media links

### Main Platform (/platform)
- **Event-Focused Landing Page**: Optimized for lead capture with minimal navigation
- **Hero Event Section**: "Next Event" headline with August 2025 countdown timer
- **Value Proposition**: "Join the mystery. Shape the story. Become an accomplice in truth."
- **Primary CTAs**: "Reserve Your Spot" and "Learn More" buttons with smooth scroll
- **Streamlined Signup**: Simplified form with just First Name (optional) and Email
- **Brief Ecosystem Tease**: What's Coming Next section without overwhelming detail
- **Essential FAQ**: Three key questions about timing, Vessel app, and pricing

### Vessel Teaser Page (/vessel)
- **App Vision**: Detailed feature breakdown and development roadmap
- **Swipeable Cards**: Mobile swipe/drag functionality, desktop click interaction
- **Original Story Studio Focus**: Creator toolkit for authentic mystery narratives
- **Early Access Registration**: Pre-launch email collection with feature feedback

### Authentication System (/signup, /signin)
- **Square Pulsing Logo**: Consistent branding across auth screens
- **7-Day Free Trial**: Prominent trial offering with pricing toggles
- **Mobile Responsive**: App-style pricing layout with savings percentages
- **Password Visibility**: Toggle functionality for user convenience

### Future Expansion Planned
- **Ticketing Integration**: Event access and RSVP platform
- **Connect Ecosystem**: Serialized video production and community involvement
- **Creator Portal**: Extended tools for story development and publication

## Deployment

The project is successfully deployed to Netlify with:
- ✅ Live site: https://lighthearted-pony-bfe03b.netlify.app
- ✅ Netlify build configuration (`netlify.toml`)
- ✅ Serverless functions for API endpoints  
- ✅ Git Gateway integration for CMS functionality
- ✅ Automatic site rebuilds when content changes
- → Pending: Netlify Identity setup for CMS authentication

See `NETLIFY_CMS_SETUP.md` for enabling CMS login functionality.

## Changelog

```
Changelog:
- June 16, 2025. Initial setup and comprehensive landing page completion
  * Hero section with animated elements and brand introduction
  * Vessel app preview with Theory Boards, Cultural Code Library, Story Studios
  * August 2025 event teaser section
  * Three-tier access system (Detective $15, Curator $35, Accomplice $75)
  * Name reservation form with investigation interests and role selection
  * User journey roadmap for different experience levels
  * Mysterious investigative theme with Afro-Futuristic color palette
  
- June 16, 2025. Vessel teaser page and ecosystem expansion
  * Dedicated Vessel app teaser page with detailed feature breakdown
  * Original Story Studio focus for creator feedback collection
  * Early access registration system for Vessel pre-launch
  * Routing structure to support ecosystem expansion
  * Strategic foundation for ticketing and connect integration

- June 29, 2025. Vessel page enhancements and mobile optimization
  * Added comprehensive app preview section with Theory Boards and Story Studio mockups
  * Implemented subtle parallax scrolling effects throughout Vessel page
  * Created mobile-first, Tinder-style swipeable feature carousel with 4 core features
  * Added "How Early Access Works" 4-step user journey section
  * Redesigned early access form with prominent Name/Email fields and optional feedback sections
  * Enhanced visual hierarchy and user experience flow

- January 22, 2025. RSVP-based launch system and interactive improvements
  * Replaced fixed date countdown with RSVP-based launch system (500 target RSVPs)
  * Added interactive carousel for event preview images on landing page
  * Made investigation levels clickable with selection state and automatic scroll
  * Enhanced Vessel app page with freemium feature breakdown
  * Added feature voting integration via Tally forms
  * Implemented progress tracking for event launch readiness
  * Updated all content to support dynamic, user-driven event scheduling
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```