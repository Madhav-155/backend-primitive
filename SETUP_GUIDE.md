# 🚀 Complete Setup Guide - Backend Primitive

## Project Overview

This is a full-stack application with:
- **Backend**: Node.js + Express.js REST API
- **Database**: MySQL
- **Frontend**: React.js
- **Authentication**: JWT with role-based access control
- **Features**: User registration, login, and task management CRUD operations

---

## 📋 Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)

---

## 🛠️ Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd e:\backend-primitive
npm install
```

This will install:
- express (Web framework)
- mysql2 (MySQL client)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- express-validator (Input validation)
- cors (Cross-origin resource sharing)
- dotenv (Environment variables)

### Step 2: Configure Environment Variables

The `.env` file is already created. Update the following values if needed:

```env
DB_HOST=localhost          # Your MySQL host
DB_USER=root              # Your MySQL username
DB_PASSWORD=              # Your MySQL password (leave empty if no password)
DB_NAME=backend_primitive # Database name
DB_PORT=3306              # MySQL port
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

### Step 3: Setup MySQL Database

1. Open MySQL Workbench or MySQL command line
2. Run the following commands:

```bash
mysql -u root -p
```

Then execute:

```sql
CREATE DATABASE backend_primitive;
USE backend_primitive;
SOURCE e:/backend-primitive/database/schema.sql;
```

Or copy the contents of `database/schema.sql` and execute them in MySQL Workbench.

**Note**: The schema creates:
- `users` table (with roles: user/admin)
- `tasks` table
- Two sample users (you'll need to register new users as passwords are hashed)

### Step 4: Start the Backend Server

```bash
npm run dev
```

Or for production:

```bash
npm start
```

The server will start on **http://localhost:5000**

✅ **Backend is ready!** You should see:
```
✅ Database connected successfully
🚀 Server running on port 5000
📝 Environment: development
🌐 API Base URL: http://localhost:5000/api/v1
💚 Health Check: http://localhost:5000/health
```

---

## 🎨 Frontend Setup

### Step 1: Install Frontend Dependencies

Open a **NEW terminal** window (keep the backend running) and run:

```bash
cd e:\backend-primitive\frontend
npm install
```

This will install:
- react & react-dom
- react-router-dom (Routing)
- axios (HTTP client)
- react-scripts (Build tools)

### Step 2: Start the Frontend

```bash
npm start
```

The React app will start on **http://localhost:3000** and automatically open in your browser.

✅ **Frontend is ready!**

---

## 🧪 Testing the Application

### 1. Register a New User

1. Go to **http://localhost:3000**
2. Click "Register here"
3. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Role: `user` or `admin`
4. Click "Register"

### 2. Login

1. Use the credentials you just created
2. You'll be redirected to the dashboard

### 3. Create Tasks

1. Click "Create New Task"
2. Fill in:
   - Title: `My First Task`
   - Description: `Testing the app`
   - Status: `pending`
   - Priority: `high`
3. Click "Create Task"

### 4. Manage Tasks

- **Edit**: Click "Edit" button on any task
- **Delete**: Only admins can delete tasks
- **View**: All your tasks are displayed on the dashboard

---

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (protected)

### Tasks
- `GET /api/v1/tasks` - Get all tasks (protected)
- `GET /api/v1/tasks/:id` - Get single task (protected)
- `POST /api/v1/tasks` - Create task (protected)
- `PUT /api/v1/tasks/:id` - Update task (protected)
- `DELETE /api/v1/tasks/:id` - Delete task (admin only)

---

## 📮 Testing with Postman

Import the Postman collection:

1. Open Postman
2. Click "Import"
3. Select file: `e:\backend-primitive\postman\Backend_Primitive_API.postman_collection.json`
4. Set the `baseUrl` variable to `http://localhost:5000`
5. After login, copy the token and set it in the `token` variable

---

## 🔐 User Roles

### User Role
- Can create tasks
- Can view their own tasks
- Can edit their own tasks
- **Cannot** delete tasks

### Admin Role
- All user permissions
- Can view all tasks (from all users)
- Can delete any task

---

## 🗂️ Project Structure

```
backend-primitive/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── authController.js    # Auth logic
│   └── taskController.js    # Task CRUD logic
├── middleware/
│   ├── auth.js              # JWT & role verification
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Input validation rules
├── routes/
│   ├── auth.js              # Auth routes
│   └── tasks.js             # Task routes
├── database/
│   └── schema.sql           # Database schema
├── postman/
│   └── Backend_Primitive_API.postman_collection.json
├── frontend/                # React application
│   ├── public/
│   └── src/
│       ├── components/      # Reusable components
│       ├── context/         # Auth context
│       ├── pages/           # Page components
│       ├── services/        # API services
│       ├── App.js
│       └── index.js
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── server.js                # Entry point
└── README.md
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Database connection failed
```
Solution: 
1. Check if MySQL is running
2. Verify credentials in .env file
3. Ensure database 'backend_primitive' exists
```

**Problem**: Port 5000 already in use
```
Solution: Change PORT in .env file to another port (e.g., 5001)
```

### Frontend Issues

**Problem**: Cannot connect to API
```
Solution: 
1. Ensure backend is running on port 5000
2. Check console for CORS errors
3. Verify proxy setting in package.json
```

**Problem**: Port 3000 already in use
```
Solution: 
1. Kill the process using port 3000
2. Or start on different port: set PORT=3001 && npm start
```

---

## 🔧 Development Commands

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start in production mode
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Create production build
npm test         # Run tests
```

---

## 🌟 Features Implemented

✅ User registration with validation  
✅ User login with JWT authentication  
✅ Password hashing with bcryptjs  
✅ Role-based access control (user/admin)  
✅ Protected API routes  
✅ Task CRUD operations  
✅ API versioning (v1)  
✅ Centralized error handling  
✅ Input validation  
✅ MySQL database with relationships  
✅ React frontend with routing  
✅ Protected frontend routes  
✅ Responsive UI design  
✅ Success/error message handling  
✅ Postman API documentation  

---

## 📖 Next Steps

1. **Test the Application**: Follow the testing guide above
2. **Explore the Code**: Check out the well-commented code
3. **Add Features**: Try adding new features like:
   - Password reset
   - Email notifications
   - Task categories
   - File uploads
   - Real-time updates with WebSockets

---

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the error messages carefully
3. Ensure all dependencies are installed
4. Verify environment variables are correct

---

## 📄 License

ISC License

---

**Happy Coding! 🚀**
