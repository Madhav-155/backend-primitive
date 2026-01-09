# 🏗️ APPLICATION ARCHITECTURE

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                     REACT FRONTEND                               │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │   Pages     │  │  Components  │  │   Context/State    │    │
│  │             │  │              │  │                    │    │
│  │ - Login     │  │ - Navbar     │  │ - AuthContext     │    │
│  │ - Register  │  │ - TaskCard   │  │ - User State      │    │
│  │ - Dashboard │  │ - Modal      │  │ - JWT Token       │    │
│  └─────────────┘  └──────────────┘  └────────────────────┘    │
│                                                                  │
│  ┌───────────────────────────────────────────────────────┐     │
│  │            API Service (Axios)                        │     │
│  │  - HTTP Client with interceptors                      │     │
│  │  - Auto-attach JWT token                              │     │
│  │  - Handle 401 redirects                               │     │
│  └───────────────────────────────────────────────────────┘     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API Calls
                             │ Authorization: Bearer <token>
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                  EXPRESS.JS BACKEND                              │
│                  http://localhost:5000/api/v1                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    MIDDLEWARE LAYER                      │  │
│  │  ┌────────────┐ ┌─────────────┐ ┌──────────────────┐   │  │
│  │  │   CORS     │→│   Parser    │→│  Request Logger  │   │  │
│  │  │  (Allow    │ │  (JSON/URL) │ │                  │   │  │
│  │  │  Frontend) │ │             │ │                  │   │  │
│  │  └────────────┘ └─────────────┘ └──────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      ROUTES                              │  │
│  │                                                          │  │
│  │  /api/v1/auth/*          /api/v1/tasks/*               │  │
│  │  ┌──────────────┐        ┌──────────────┐              │  │
│  │  │ Auth Routes  │        │ Task Routes  │              │  │
│  │  │              │        │              │              │  │
│  │  │ POST/register│        │ GET    /     │              │  │
│  │  │ POST/login   │        │ GET    /:id  │              │  │
│  │  │ GET /me      │        │ POST   /     │              │  │
│  │  │              │        │ PUT    /:id  │              │  │
│  │  │              │        │ DELETE /:id  │              │  │
│  │  └──────────────┘        └──────────────┘              │  │
│  │         │                        │                      │  │
│  │         │                        │                      │  │
│  │         ▼                        ▼                      │  │
│  │  ┌──────────────┐        ┌──────────────┐              │  │
│  │  │   Protect    │        │   Protect    │              │  │
│  │  │  Middleware  │        │  Middleware  │              │  │
│  │  │              │        │ + Authorize  │              │  │
│  │  │ - Verify JWT │        │              │              │  │
│  │  │ - Get User   │        │ - Check Role │              │  │
│  │  └──────────────┘        └──────────────┘              │  │
│  │         │                        │                      │  │
│  │         ▼                        ▼                      │  │
│  │  ┌──────────────┐        ┌──────────────┐              │  │
│  │  │  Validation  │        │  Validation  │              │  │
│  │  │  Middleware  │        │  Middleware  │              │  │
│  │  │              │        │              │              │  │
│  │  │ - Check Req  │        │ - Validate   │              │  │
│  │  │ - Sanitize   │        │   Input      │              │  │
│  │  └──────────────┘        └──────────────┘              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                               │                                 │
│                               ▼                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    CONTROLLERS                           │  │
│  │  ┌──────────────┐        ┌──────────────┐               │  │
│  │  │    Auth      │        │     Task     │               │  │
│  │  │  Controller  │        │  Controller  │               │  │
│  │  │              │        │              │               │  │
│  │  │ - register() │        │ - getTasks() │               │  │
│  │  │ - login()    │        │ - getTask()  │               │  │
│  │  │ - getMe()    │        │ - create()   │               │  │
│  │  │              │        │ - update()   │               │  │
│  │  │              │        │ - delete()   │               │  │
│  │  └──────────────┘        └──────────────┘               │  │
│  │         │                        │                       │  │
│  │         │ bcrypt (hash)         │                       │  │
│  │         │ jwt (sign)            │                       │  │
│  │         │                        │                       │  │
│  └─────────┼────────────────────────┼───────────────────────┘  │
│            │                        │                          │
│            └────────────┬───────────┘                          │
│                         │                                      │
│                         ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              DATABASE CONNECTION POOL                    │  │
│  │                    (mysql2)                              │  │
│  │                                                          │  │
│  │  - Connection pooling (max 10)                          │  │
│  │  - Prepared statements                                  │  │
│  │  - Auto-reconnect                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ SQL Queries
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      MySQL DATABASE                              │
│                                                                  │
│  ┌───────────────────────────────┐  ┌─────────────────────────┐│
│  │         USERS TABLE           │  │      TASKS TABLE        ││
│  │                               │  │                         ││
│  │  - id (PK, AUTO_INCREMENT)    │  │ - id (PK, AUTO_INC)     ││
│  │  - username (UNIQUE)          │  │ - title                 ││
│  │  - email (UNIQUE)             │  │ - description           ││
│  │  - password (HASHED)          │  │ - status (ENUM)         ││
│  │  - role (ENUM: user/admin)    │  │ - priority (ENUM)       ││
│  │  - created_at                 │  │ - user_id (FK)  ────────┼┼─┐
│  │  - updated_at                 │  │ - created_at            ││ │
│  │                               │  │ - updated_at            ││ │
│  └───────────────────────────────┘  └─────────────────────────┘│ │
│                  ▲                                               │ │
│                  └───────────────────────────────────────────────┘ │
│                           FOREIGN KEY RELATIONSHIP                 │
└────────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Examples

### 1. User Registration Flow

```
[Browser] → POST /api/v1/auth/register
            {username, email, password, role}
              │
              ▼
[Express] → CORS Middleware → ✅ Allow
              │
              ▼
          Body Parser → Parse JSON
              │
              ▼
          Validation → Check format, length, etc.
              │
              ▼
        Auth Controller.register()
              │
              ├─→ Check if user exists (DB query)
              │
              ├─→ Hash password (bcrypt)
              │
              ├─→ Insert user (DB query)
              │
              └─→ Generate JWT token
                     │
                     ▼
[Browser] ← {success: true, token: "...", user: {...}}
              │
              ▼
         Store token in localStorage
              │
              ▼
         Redirect to Dashboard
```

### 2. Protected Task Creation Flow

```
[Browser] → POST /api/v1/tasks
            Headers: {Authorization: "Bearer <token>"}
            Body: {title, description, status, priority}
              │
              ▼
[Express] → Protect Middleware
              │
              ├─→ Extract token from header
              │
              ├─→ Verify JWT signature
              │
              ├─→ Decode user ID & role
              │
              ├─→ Query user from DB
              │
              └─→ Attach user to req.user
                     │
                     ▼
          Validation Middleware
              │
              └─→ Validate task fields
                     │
                     ▼
        Task Controller.createTask()
              │
              ├─→ Get user ID from req.user
              │
              ├─→ Insert task (DB query)
              │
              └─→ Return created task
                     │
                     ▼
[Browser] ← {success: true, data: {...}}
              │
              ▼
         Show success message
              │
              ▼
         Refresh task list
```

### 3. Admin Delete Task Flow

```
[Browser] → DELETE /api/v1/tasks/123
            Headers: {Authorization: "Bearer <admin_token>"}
              │
              ▼
[Express] → Protect Middleware
              │
              └─→ Verify token & get user
                     │
                     ▼
          Authorize Middleware (Admin check)
              │
              ├─→ Check req.user.role === 'admin'
              │
              └─→ ✅ Allow or ❌ 403 Forbidden
                     │
                     ▼
        Task Controller.deleteTask()
              │
              ├─→ Check if task exists
              │
              ├─→ Delete from DB
              │
              └─→ Return success
                     │
                     ▼
[Browser] ← {success: true, message: "Task deleted"}
              │
              ▼
         Remove task from UI
              │
              ▼
         Show success message
```

---

## Authentication Flow

```
┌────────────────────────────────────────────────────────────┐
│                    JWT Authentication                       │
└────────────────────────────────────────────────────────────┘

1. User Login
   ┌────────┐
   │ Client │ → POST /login {email, password}
   └────────┘
       ↓
   ┌────────┐
   │ Server │ → Verify password (bcrypt.compare)
   └────────┘
       ↓
   Generate JWT Token:
   {
     payload: {id: 1, role: 'user'},
     secret: JWT_SECRET,
     expiry: 24h
   }
       ↓
   Return: {token: "eyJhbG...", user: {...}}

2. Client Storage
   ┌────────┐
   │ Client │ → localStorage.setItem('token', token)
   └────────┘

3. Subsequent Requests
   ┌────────┐
   │ Client │ → GET /tasks
   └────────┘   Headers: {Authorization: "Bearer eyJhbG..."}
       ↓
   ┌────────┐
   │ Server │ → jwt.verify(token, JWT_SECRET)
   └────────┘
       ↓
   Extract user from token → req.user = {id: 1, role: 'user'}
       ↓
   Process request with user context
```

---

## Database Relationships

```
┌─────────────────┐         ┌─────────────────┐
│     USERS       │         │      TASKS      │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │◄───────┤│ user_id (FK)    │
│ username        │    1:N  │ id (PK)         │
│ email           │         │ title           │
│ password        │         │ description     │
│ role            │         │ status          │
│ created_at      │         │ priority        │
│ updated_at      │         │ created_at      │
└─────────────────┘         │ updated_at      │
                            └─────────────────┘

Relationship: One User → Many Tasks
Cascade: ON DELETE CASCADE (delete user → delete tasks)
```

---

## Security Layers

```
┌────────────────────────────────────────────────────────────┐
│                    Security Layers                          │
└────────────────────────────────────────────────────────────┘

Layer 1: Password Security
   ┌──────────────────────────────────────────┐
   │ bcrypt.hash(password, 10 salt rounds)    │
   │ Stored: $2a$10$abc...xyz (60 chars)      │
   └──────────────────────────────────────────┘

Layer 2: JWT Token
   ┌──────────────────────────────────────────┐
   │ Signed with secret key                   │
   │ Contains: {id, role, iat, exp}          │
   │ Expires: 24 hours                        │
   └──────────────────────────────────────────┘

Layer 3: Middleware Protection
   ┌──────────────────────────────────────────┐
   │ 1. Verify token signature                │
   │ 2. Check token expiration                │
   │ 3. Load user from database               │
   │ 4. Check user role                       │
   └──────────────────────────────────────────┘

Layer 4: Input Validation
   ┌──────────────────────────────────────────┐
   │ 1. Type checking                         │
   │ 2. Length validation                     │
   │ 3. Format validation (email, etc)       │
   │ 4. Sanitization                          │
   └──────────────────────────────────────────┘

Layer 5: SQL Injection Prevention
   ┌──────────────────────────────────────────┐
   │ Parameterized queries                    │
   │ pool.query('SELECT * FROM users          │
   │   WHERE id = ?', [userId])               │
   └──────────────────────────────────────────┘

Layer 6: CORS Protection
   ┌──────────────────────────────────────────┐
   │ Only allow requests from:                │
   │ - http://localhost:3000                  │
   └──────────────────────────────────────────┘
```

---

## Role-Based Access Matrix

```
┌───────────────┬─────────┬─────────┐
│   Endpoint    │  User   │  Admin  │
├───────────────┼─────────┼─────────┤
│ POST /register│   ✅    │   ✅    │
│ POST /login   │   ✅    │   ✅    │
│ GET /me       │   ✅    │   ✅    │
├───────────────┼─────────┼─────────┤
│ GET /tasks    │ Own only│   All   │
│ GET /tasks/:id│ Own only│   Any   │
│ POST /tasks   │   ✅    │   ✅    │
│ PUT /tasks/:id│ Own only│   Any   │
│ DELETE /tasks │   ❌    │   ✅    │
└───────────────┴─────────┴─────────┘
```

---

## Technology Stack Diagram

```
┌────────────────────────────────────────────────────────────┐
│                      FRONTEND STACK                         │
├────────────────────────────────────────────────────────────┤
│  React.js 18         │ UI Library                          │
│  React Router v6     │ Client-side routing                 │
│  Axios              │ HTTP client                          │
│  Context API        │ State management                     │
│  CSS3               │ Styling with gradients              │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                      BACKEND STACK                          │
├────────────────────────────────────────────────────────────┤
│  Node.js            │ Runtime environment                  │
│  Express.js 4       │ Web framework                        │
│  mysql2             │ MySQL client (Promise-based)        │
│  bcryptjs           │ Password hashing                     │
│  jsonwebtoken       │ JWT generation & verification       │
│  express-validator  │ Input validation                     │
│  cors               │ Cross-origin resource sharing       │
│  dotenv             │ Environment variables               │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                      DATABASE                               │
├────────────────────────────────────────────────────────────┤
│  MySQL 5.7+         │ Relational database                  │
│  InnoDB Engine      │ ACID compliance                      │
│  Foreign Keys       │ Referential integrity               │
│  Indexes            │ Performance optimization            │
└────────────────────────────────────────────────────────────┘
```

---

## File Structure Tree

```
backend-primitive/
│
├── 📁 config/
│   └── database.js              # MySQL connection pool
│
├── 📁 controllers/
│   ├── authController.js        # Auth business logic
│   └── taskController.js        # Task CRUD logic
│
├── 📁 middleware/
│   ├── auth.js                  # JWT verification & role check
│   ├── errorHandler.js          # Centralized error handling
│   └── validation.js            # Input validation rules
│
├── 📁 routes/
│   ├── auth.js                  # Auth endpoints
│   └── tasks.js                 # Task endpoints
│
├── 📁 database/
│   └── schema.sql               # Database schema
│
├── 📁 postman/
│   └── Backend_Primitive_API.postman_collection.json
│
├── 📁 frontend/
│   ├── 📁 public/
│   │   └── index.html
│   │
│   └── 📁 src/
│       ├── 📁 components/
│       │   ├── Navbar.js
│       │   └── PrivateRoute.js
│       │
│       ├── 📁 context/
│       │   └── AuthContext.js
│       │
│       ├── 📁 pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Dashboard.js
│       │
│       ├── 📁 services/
│       │   └── api.js
│       │
│       ├── App.js
│       ├── index.js
│       └── index.css
│
├── 📄 server.js                 # Entry point
├── 📄 package.json              # Dependencies
├── 📄 .env                      # Environment config
├── 📄 .gitignore
│
└── 📚 Documentation/
    ├── README.md
    ├── SETUP_GUIDE.md
    ├── API_TESTING_GUIDE.md
    ├── PROJECT_SUMMARY.md
    └── QUICKSTART.md
```

---

This architecture provides:
- ✅ Separation of concerns
- ✅ Scalable structure
- ✅ Security best practices
- ✅ Clean code organization
- ✅ Easy maintenance
- ✅ Professional patterns
