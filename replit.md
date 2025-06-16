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

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```