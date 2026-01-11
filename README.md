# Backend Primitive - Full Stack Task Manager

A complete full-stack application with scalable REST API, authentication, role-based access control, and a React frontend.

## Features

### Backend
- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Role-based access control (User and Admin)
- CRUD operations for tasks
- API versioning (v1)
- Centralized error handling
- Input validation with express-validator
- MySQL database with proper schema
- API documentation (Postman collection)
- Protected routes with JWT middleware

### Frontend
- React.js with React Router
- User registration and login UI
- Protected dashboard
- Task management interface (Create, Read, Update, Delete)
- Role-based UI elements
- Success and error message handling
- Responsive design
- JWT token management

## Tech Stack

### Backend
- **Framework**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing
- **CORS**: Enabled for frontend communication

### Frontend
- **Framework**: React.js
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: Custom CSS with gradient design

## Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- npm

### Option 1: Automated Setup (Windows)

```bash
# Run the setup script
setup.bat

# Then start the servers in separate terminals:
start-backend.bat   # Terminal 1
start-frontend.bat  # Terminal 2
```

### Option 2: Manual Setup

**1. Install Dependencies**

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

**2. Setup Database**

```sql
CREATE DATABASE backend_primitive;
USE backend_primitive;
SOURCE database/schema.sql;
```

Or import `database/schema.sql` in MySQL Workbench.

**3. Configure Environment**

Update `.env` file with your MySQL credentials:
```env
DB_PASSWORD=your_mysql_password
```

**4. Start Servers**

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**5. Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/v1
- Health Check: http://localhost:5000/health

## Documentation

- **[Complete Setup Guide](SETUP_GUIDE.md)** - Detailed installation and configuration
- **[API Testing Guide](API_TESTING_GUIDE.md)** - How to test APIs with curl/Postman
- **[Postman Collection](postman/Backend_Primitive_API.postman_collection.json)** - Import and test all endpoints

## Project Structure

```
backend-primitive/
├── config/              # Database configuration
├── controllers/         # Business logic
├── middleware/          # Auth, validation, error handling
├── routes/              # API routes
├── database/            # SQL schema
├── postman/             # API documentation
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── public/
├── .env                 # Environment variables
├── server.js            # Entry point
└── README.md
```

## API Endpoints

### Authentication (Public)
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user and get JWT token

### Authentication (Protected)
- `GET /api/v1/auth/me` - Get current user details

### Tasks (Protected)
- `GET /api/v1/tasks` - Get all tasks (User: own tasks, Admin: all tasks)
- `GET /api/v1/tasks/:id` - Get single task by ID
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task (Admin only)

## User Roles

### User Role
- Create and manage their own tasks
- View only their tasks
- Cannot delete tasks

### Admin Role
- All user permissions
- View all tasks from all users
- Can delete any task

## Frontend Features

### Pages
- **Login** - User authentication
- **Register** - New user registration with role selection
- **Dashboard** - Protected task management interface

### Components
- **Navbar** - Navigation with user info and logout
- **PrivateRoute** - Route protection component
- **TaskCard** - Individual task display with actions
- **Modal** - Create/Edit task form

### State Management
- **AuthContext** - Global authentication state
- JWT token stored in localStorage
- Auto-redirect on unauthorized access

## Testing the Application

### 1. Register a User
1. Go to http://localhost:3000
2. Click "Register"
3. Fill in details (username, email, password, role)
4. Submit

### 2. Create Tasks
1. Login with your credentials
2. Click "Create New Task"
3. Fill in task details
4. Submit

### 3. Manage Tasks
- **Edit**: Update task status, priority, or description
- **Delete**: Admin users can delete tasks
- **Filter**: View tasks based on status/priority

### 4. Test API with Postman
1. Import collection from `postman/Backend_Primitive_API.postman_collection.json`
2. Set `baseUrl` to `http://localhost:5000`
3. Register/Login to get token
4. Set token in collection variables
5. Test all endpoints

## Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT tokens with expiration (24h default)
- Protected routes with middleware
- Role-based authorization
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- CORS configuration
- Error message sanitization

## Configuration

### Environment Variables (.env)
```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment
DB_HOST=localhost            # MySQL host
DB_USER=root                 # MySQL username
DB_PASSWORD=                 # MySQL password
DB_NAME=backend_primitive    # Database name
DB_PORT=3306                 # MySQL port
JWT_SECRET=your_secret       # JWT signing key
JWT_EXPIRE=24h               # Token expiration
FRONTEND_URL=http://localhost:3000  # CORS origin
```

## Troubleshooting

### Database Connection Failed
- Verify MySQL is running
- Check credentials in .env
- Ensure database exists

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Use PORT=3001 npm start

### CORS Errors
- Verify FRONTEND_URL in .env
- Check backend is running on correct port

### Token Issues
- Clear localStorage in browser
- Re-login to get new token
- Check token hasn't expired

## Future Enhancements

Potential features to add:
- Password reset functionality
- Email verification
- Task categories and tags
- File attachments
- Real-time updates with WebSockets
- Task sharing between users
- Activity logs
- Advanced filtering and search
- Export tasks to CSV/PDF
- Dark mode

## Contributing

This is a learning project showcasing:
- RESTful API design
- Authentication patterns
- Database relationships
- Frontend-backend integration
- Security best practices

## License

ISC License

---



## Complete Documentation

- **[INDEX.md](INDEX.md)** - Documentation index and navigation guide
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Visual 10-minute setup guide  
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute fast track for experienced devs
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete installation with troubleshooting
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design, diagrams, and flows
- **[API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)** - How to test all endpoints
- **[FEATURES.md](FEATURES.md)** - Complete feature checklist
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview and stats

**👉 New here? Start with [GETTING_STARTED.md](GETTING_STARTED.md)**
