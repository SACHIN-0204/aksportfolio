# Abhishek Kirana Store Portfolio

Premium MERN business portfolio with public product showcase and protected admin dashboard.

## Requirements
- Node.js 20+
- MongoDB Atlas or local MongoDB

## Setup (single project)
The API loads environment variables from the project-root `.env` first, then `server/.env` for any values not already set.
```bash
cp .env.example .env     # fill in MONGO_URI, JWT_SECRET, admin credentials, store phone/address
npm install
npm run seed:admin
npm run seed:products    # optional sample products
npm run dev              # API on :5000 + site on http://localhost:5173
```

## Production (one server, one deploy)
```bash
npm install
npm run build            # builds the React app into client/dist
npm start                # Express serves the API (/api) AND the website on PORT
```
Deploy the whole repo to Render/Railway/a VPS with build command `npm install && npm run build` and start command `npm start`. No separate frontend host or `VITE_API_URL` is needed; the site and API share one origin.

## Structure
```
package.json   .env   (one for everything)
server/        Express + MongoDB API
client/        React (Vite) frontend
```

## Admin
Visit `/admin/login` and sign in using the credentials configured in `.env`.
The seed command creates the admin if it does not already exist.

## API
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/categories`
- `GET /api/products/:id`
- `GET /api/products/admin/all` (admin)
- `POST /api/auth/login`
- `GET /api/auth/me` (admin)
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/offers`
- `GET /api/offers/admin/all` (admin)
- `POST /api/offers` (admin)
- `PUT /api/offers/:id` (admin)
- `DELETE /api/offers/:id` (admin)
- `POST /api/enquiries`
- `GET /api/enquiries`, `GET /api/enquiries/stats` (admin)
- `PATCH /api/enquiries/:id/status`, `DELETE /api/enquiries/:id` (admin)

## Production checklist
- Use a strong unique JWT secret and admin password.
- `CLIENT_URL` is only needed in development; in production everything is same-origin.
- Use HTTPS for both frontend and API.
- Configure MongoDB Atlas network access and least-privilege credentials.
- Add Cloudinary or another managed image host before accepting public image uploads.
- Add privacy policy, terms, business address, phone, and verified business details.
- Test admin access, validation, backups, mobile layouts, and error handling before launch.

This is a starter implementation, not a substitute for a production security review.
