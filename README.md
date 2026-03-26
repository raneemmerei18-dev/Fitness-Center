# Fitness Center Web Application

A complete fitness center platform built with Next.js App Router and MongoDB.

The application includes:
- Public website pages for visitors
- Authentication (login and signup)
- Admin dashboard with role-based access
- User dashboard for member activity
- Content and media management from dashboard forms

## Project Summary

This project was built as a full-stack web solution for a fitness center. It supports both public users and internal staff workflows.

Main goals:
- Present fitness services, programs, blog, and news
- Capture user interest and contact submissions
- Allow administrators to manage all website content from a dashboard
- Apply role-based authorization for protected sections

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Cookie-based session auth with jose
- bcryptjs for password hashing

## Key Features

### Public Website
- Home page with dynamic hero content and image
- About page
- Services listing
- Projects listing and project details pages
- Blog listing and blog details pages
- News listing and news details pages
- Contact form

### Authentication and Access Control
- User login and signup
- Session cookie authentication
- Role and section based permissions for admin dashboard
- Super Admin support

### Admin Dashboard
- Content management for site sections
- Services CRUD
- Projects CRUD with image file upload
- Blog CRUD
- News CRUD
- User and role management
- Submissions and inquiries management

### User Dashboard
- Member overview
- Program inquiry visibility
- Navigation to public sections

## Data Models

Main models are exported from [lib/db/models/index.ts](lib/db/models/index.ts):

- User
- Role
- RolePermission
- SiteContent
- Service
- Project
- ProjectInquiry
- BlogPost
- NewsPost
- ContactSubmission

## Project Structure

- [app](app): App Router pages and API routes
- [app/api](app/api): backend route handlers
- [app/dashboard](app/dashboard): admin area
- [app/user-dashboard](app/user-dashboard): member area
- [components](components): reusable UI components
- [lib](lib): auth, database, permissions, and helpers
- [scripts/seed.ts](scripts/seed.ts): database seed script

## Environment Variables

Create a .env file in project root.

Required:
- MONGO_URL: MongoDB connection string

Example:
- MONGO_URL=mongodb://localhost:27017/fitness-center

The app currently reads this variable in [lib/db/connect.ts](lib/db/connect.ts).

## Local Setup

1. Install dependencies
	npm install

2. Configure environment
	Add MONGO_URL in .env

3. Seed database
	npm run db:seed

4. Start development server
	npm run dev

5. Open browser
	http://localhost:3000

## Available Scripts

From [package.json](package.json):

- npm run dev: start development server
- npm run build: create production build
- npm run start: run production server
- npm run lint: run linter
- npm run db:seed: seed MongoDB with starter data

## Seeded Accounts

From [scripts/seed.ts](scripts/seed.ts):

- Super Admin
  - Email: admin@fitmotion.local
  - Password: Admin@123

- Blog Editor
  - Email: editor@fitmotion.local
  - Password: Editor@123

## Image Upload Behavior

- Admin content and project forms support file upload.
- Uploaded files are stored in public/uploads.
- Saved file paths are then rendered on public pages.

## Auth and Routing Notes

- Dashboard protection is handled in [proxy.ts](proxy.ts).
- Protected path matchers include:
  - /dashboard/:path*
  - /user-dashboard/:path*

## Build and Submission Checklist

Before submission, run:

1. npm run lint
2. npm run build
3. Ensure .env secrets are not committed
4. Confirm MongoDB URL in deployment environment
5. Verify dashboard CRUD and public pages manually

## Known Operational Notes

- If git push is rejected with non-fast-forward, your local branch is behind remote.
- If you intentionally want local history to replace remote history, use force-with-lease carefully.

## Future Improvements

- Add validation and richer error messages on dashboard forms
- Add tests for API routes and auth flows
- Add pagination for blog, news, and submissions
- Add image optimization pipeline and cleanup strategy for unused uploads

## License

This project is for educational and submission use unless you define a separate license.
