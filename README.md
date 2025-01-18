Backend - Inventory Management System
=====================================

This is the backend API for the Inventory Management System. It provides endpoints for user authentication and product management.

Deployed API:
-------------
- Live Backend API: https://backend-service-owh5.onrender.com

Technologies Used:
------------------
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs (for password hashing)
- JSON Web Tokens (JWT) for authentication

Setup Instructions:
-------------------
1. Clone the repository:
   git clone https://github.com/j-wrege/backend-repo.git

2. Navigate to the project directory:
   cd backend-repo

3. Install dependencies:
   npm install

4. Create a `.env` file in the root directory and add the following:
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   REACT_APP_BACKEND_URL=https://backend-service-owh5.onrender.com
   PORT=5001

5. Start the server in production mode:
   npm start

6. Install nodemon globally:
   npm install -g nodemon
   
7. Start the server:
   npx nodemon server.js

Folder Structure:
-----------------
- `routes`: Contains route files for authentication and products
- `models`: MongoDB models for users and products
- `middleware`: Authentication middleware

Scripts:
--------
- `npm start`: Starts the server in production mode
- `npx nodemon server.js`: Starts the server in development mode with hot reload
