# Store_Rating_platform
# Store Rating Platform

A full-stack MERN application for rating and managing stores. The platform supports three user roles: **Admin**, **Store Owner**, and **Regular User**.

---

## Features

- **User Authentication**: Register and login with role-based access (admin, owner, user).
- **Admin Dashboard**: View platform statistics, manage users, add stores, and view user details.
- **Store Owner Dashboard**: Add and manage your store, view customer ratings and feedback.
- **User Dashboard**: Browse stores, search by name/address, rate stores.
- **Store Ratings**: Users can rate stores (1-5 stars), update their ratings, and view average ratings.
- **Responsive UI**: Built with React, Tailwind CSS, and Vite for fast development.

---

## Project Structure

```
backend/
  ├── controllers/
  ├── middlewares/
  ├── models/
  ├── routes/
  ├── config/
  ├── .env
  ├── package.json
  └── server.js
frontend/
  ├── public/
  ├── src/
  │   ├── auth/
  │   ├── components/
  │   ├── pages/
  │   ├── utils/
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── index.css
  ├── package.json
  └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/store-rating-platform.git
cd store-rating-platform
```

### 2. Setup Backend

```sh
cd backend
npm install
```

- Create a `.env` file in the `backend` folder:

  ```
  PORT=3001
  MONGO_URI=mongodb://localhost:27017/StoreDB
  JWT_SECRET=your_jwt_secret
  ```

- Start the backend server:

  ```sh
  npm run server
  ```

### 3. Setup Frontend

```sh
cd ../frontend
npm install
```

- Start the frontend development server:

  ```sh
  npm run dev
  ```

- The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## Usage

- **Register** as a user, owner, or admin.
- **Login** to access your dashboard.
- **Admin** can view stats, manage users, and add stores.
- **Owners** can add their store and view ratings.
- **Users** can browse and rate stores.

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login

### Admin

- `GET /api/admin/dashboard` — Platform stats (admin only)
- `GET /api/admin/list` — List all users (admin only)
- `GET /api/admin/:id` — Get user details (admin only)

### Store

- `POST /api/store/add` — Add a new store (admin/owner)
- `GET /api/store/details` — Get stores (user)
- `POST /api/store/:storeId` — Rate a store (user)
- `GET /api/store/owner/mystore` — Get owner's store and ratings (owner)

---

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Other**: ESLint, dotenv

---

## License

This project is licensed under the MIT License.

---

## Author

- [Your Name](https://github.com/Amey2815)
