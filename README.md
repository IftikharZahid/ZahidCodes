# ZahidCodes.tech — Dynamic Portfolio CMS

A full-stack portfolio and project showcase:
- Public portfolio with search, category filters, project detail pages and responsive layout.
- Protected admin dashboard with login, project create/edit/delete, image uploads, technology tags and featured projects.
- Basic analytics: portfolio visits, project views and click-throughs.
- MongoDB persistence, Express API, JWT authentication and password hashing.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- MongoDB Atlas database or local MongoDB

## 1. Configure the backend
Copy `server/.env.example` to `server/.env` and set:
- `MONGODB_URI`
- `JWT_SECRET` (use a long random secret)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` (strong password; change before deployment)
- `CLIENT_ORIGIN` (for local development use `http://localhost:5173`)

The first time the API starts, it creates the admin account from `ADMIN_EMAIL` and `ADMIN_PASSWORD` if that account does not exist. Do not expose these values or commit `.env`.

## 2. Install and run
From the project root:

```bash
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

Frontend: http://localhost:5173  
Backend health: http://localhost:5000/api/health  
Admin login: http://localhost:5173/admin/login

## 3. Production build
```bash
npm run build
npm start
```
For production, deploy the client build to a static host and the API to a Node host, or configure your hosting provider to serve `client/dist`. Set `VITE_API_URL` to the deployed API base URL when building the client. Set `CLIENT_ORIGIN` to the deployed frontend origin.

## Admin usage
1. Open `/admin/login`.
2. Sign in with the credentials configured in `server/.env`.
3. Add a project with title, summary, description, category, technologies, links and optional cover image.
4. Toggle Featured to show it in the featured area.
5. Use the dashboard metrics to monitor visits and project views.

## Add a project manually
Use the admin dashboard. The public projects are loaded dynamically from MongoDB; no source-code edit is needed for normal content updates.

## Important production checklist
- Replace the example email/social links in `client/src/App.jsx`.
- Set a strong unique `JWT_SECRET` and admin password.
- Use HTTPS for both frontend and API.
- Restrict MongoDB network access to your server.
- Configure persistent storage for uploaded images, or replace local Multer storage with S3/Cloudinary for serverless/multi-instance deployments.
- Back up MongoDB and uploaded media.
- Add your real GitHub, LinkedIn and contact details before publishing.

## API overview
- `GET /api/projects` — public project list
- `GET /api/projects/:slug` — project detail (increments view)
- `POST /api/analytics/visit` — record public visit
- `POST /api/analytics/click/:projectId` — record project link click
- `POST /api/auth/login` — admin login
- `GET /api/admin/dashboard` — protected metrics
- `POST /api/admin/projects` — protected create (multipart form)
- `PUT /api/admin/projects/:id` — protected update (multipart form)
- `DELETE /api/admin/projects/:id` — protected delete

This is a complete starter product, but production deployment still requires environment configuration and hosting setup.
