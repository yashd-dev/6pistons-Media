# 6Pistons - Automotive Content Platform

## Overview

6Pistons is a professional automotive content platform designed to deliver high-quality reviews, articles, and insights about cars, motorcycles, and the automotive industry. The platform features a modern, responsive design with advanced functionality including real-time comments, search capabilities, infinite scrolling, and dynamic content management via Sanity CMS.

## Features

### Content Management

- Sanity CMS integration for content management
- Rich text editing with image support
- Category-based content organization
- Author profiles and attribution

### User Experience

- Responsive design optimized for all devices
- Fast, smooth animations using Framer Motion
- Infinite scroll for seamless content discovery
- Previous/next post navigation
- Real-time search with filtering capabilities
- Dark mode optimized interface

### Engagement

- Firebase-powered comment system
- Like functionality for posts
- Author replies to comments
- User authentication (email/password and Google)
- Anti-spam and bot prevention with reCAPTCHA

### SEO & Performance

- Dynamic sitemap generation
- Webhook-based content revalidation
- Optimized metadata for social sharing
- Structured data for improved search engine visibility
- Performance-optimized image loading

## Technology Stack

### Frontend

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- shadcn/ui component library

### Backend & Services

- Sanity CMS for content management
- Firebase (Authentication, Firestore) for user management and comments
- Next.js API routes and Server Actions
- Vercel for hosting and serverless functions

### Performance & SEO

- Next.js Image optimization
- Dynamic metadata generation
- Incremental Static Regeneration (ISR)
- Automatic sitemap generation

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Firebase account
- Sanity account
- Vercel account (for deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yashd-dev/6pistons-Media.git
   cd 6pistons
   ```

2. Install dependencies:

   ```bash
   npm install

   # or

   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```

   # Sanity Configuration

   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-12-04
   SANITY_WEBHOOK_SECRET=your_webhook_secret

   # Firebase Configuration

   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # reCAPTCHA Configuration

   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

4. Run the development server:

   ```bash
   npm run dev

   # or

   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Set up the following collections:
   - `comments`
   - `commentLikes`
   - `commentReports`
   - `postLikes`
5. Set up security rules for your Firestore database:

```
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
// Comments
match /comments/{commentId} {
allow read;
allow create: if request.auth != null;
allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
}

    // Comment likes
    match /commentLikes/{likeId} {
      allow read;
      allow create, delete: if request.auth != null;
    }

    // Comment reports
    match /commentReports/{reportId} {
      allow create: if request.auth != null;
      allow read, update, delete: if false; // Admin only via Firebase console
    }

    // Post likes
    match /postLikes/{likeId} {
      allow read;
      allow create, delete: if request.auth != null;
    }

}
}
```

## Sanity CMS Setup

1. Create a new Sanity project at [https://www.sanity.io/](https://www.sanity.io/)
2. Set up the following schemas:
   - Post
   - Author
   - Category
3. Configure the webhook in Sanity to trigger the revalidation endpoint:
   - URL: `https://yourdomain.com/api/sanity/webhook`
   - HTTP method: POST
   - Secret: Use the same value as your `SANITY_WEBHOOK_SECRET` environment variable

## Project Structure

```
6pistons/
├── app/ # Next.js App Router
│ ├── actions/ # Server Actions
│ ├── api/ # API Routes
│ ├── article/ # Article pages
│ ├── author/ # Author pages
│ ├── components/ # Client components
│ ├── about/ # About page
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/ # Shared components
│ ├── auth/ # Authentication components
│ ├── comments/ # Comment system components
│ └── ui/ # UI components (shadcn)
├── contexts/ # React contexts
├── lib/ # Utility functions
│ ├── firebase/ # Firebase configuration and services
│ └── utils.ts # General utilities
├── public/ # Static assets
├── sanity/ # Sanity configuration
│ ├── lib/ # Sanity client utilities
│ └── schemas/ # Content schemas
├── styles/ # Additional styles
├── next.config.mjs # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
```

## Deployment

### Vercel Deployment

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Configure the environment variables
5. Deploy

### Environment Variables on Vercel

Make sure to add all the environment variables listed in the Installation section to your Vercel project.

## Performance Optimization

- The application uses Next.js Image component for optimized image loading
- Incremental Static Regeneration (ISR) for fast page loads with fresh content
- Client-side caching strategies for improved performance
- Code splitting and lazy loading for reduced bundle size

## SEO Optimization

- Dynamic metadata generation for each page
- Structured data for rich search results
- Automatic sitemap generation
- Social media meta tags for improved sharing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Sanity](https://www.sanity.io/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
