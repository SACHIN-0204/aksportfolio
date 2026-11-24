# Abhishek Kirana Store Portfolio

Premium MERN business portfolio with public product showcase and protected admin dashboard.

## Requirements
- Node.js 20+
- MongoDB Atlas or local MongoDB

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run seed:admin
npm run dev
```
Set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `server/.env`.

### 2. Frontend
In another terminal:
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Open the Vite URL shown in the terminal. Backend runs on port 5000.

## Admin
Visit `/admin/login` and sign in using the credentials configured in `server/.env`.
The seed command creates the admin if it does not already exist.

## API
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/auth/login`
- `GET /api/auth/me` (admin)
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/offers`
- `POST /api/offers` (admin)
- `DELETE /api/offers/:id` (admin)
- `POST /api/enquiries`

## Production checklist
- Use a strong unique JWT secret and admin password.
- Set exact production frontend URL in `CLIENT_URL`.
- Use HTTPS for both frontend and API.
- Configure MongoDB Atlas network access and least-privilege credentials.
- Add Cloudinary or another managed image host before accepting public image uploads.
- Add privacy policy, terms, business address, phone, and verified business details.
- Test admin access, validation, backups, mobile layouts, and error handling before launch.

This is a starter implementation, not a substitute for a production security review.
