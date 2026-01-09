# 📮 API Testing Guide

## Quick Test Using curl or Postman

### 1. Health Check (No Auth Required)

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-10T..."
}
```

---

## 🔐 Authentication APIs

### 2. Register a New User

**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**curl Command:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"johndoe\",\"email\":\"john@example.com\",\"password\":\"password123\",\"role\":\"user\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 3,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token!** You'll need it for authenticated requests.

---

### 3. Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**curl Command:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 3,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 4. Get Current User (Protected)

**Endpoint:** `GET /api/v1/auth/me`

**Headers Required:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**curl Command:**
```bash
curl http://localhost:5000/api/v1/auth/me ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2026-01-10T..."
  }
}
```

---

## 📝 Task Management APIs (All Protected)

### 5. Create a Task

**Endpoint:** `POST /api/v1/tasks`

**Headers Required:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "pending",
  "priority": "high"
}
```

**curl Command:**
```bash
curl -X POST http://localhost:5000/api/v1/tasks ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Complete project documentation\",\"description\":\"Write comprehensive API documentation\",\"status\":\"pending\",\"priority\":\"high\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "pending",
    "priority": "high",
    "user_id": 3,
    "created_at": "2026-01-10T...",
    "updated_at": "2026-01-10T..."
  }
}
```

---

### 6. Get All Tasks

**Endpoint:** `GET /api/v1/tasks`

**Headers Required:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**curl Command:**
```bash
curl http://localhost:5000/api/v1/tasks ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive API documentation",
      "status": "pending",
      "priority": "high",
      "user_id": 3,
      "created_at": "2026-01-10T...",
      "updated_at": "2026-01-10T..."
    },
    {
      "id": 2,
      "title": "Review code",
      "description": "Review pull requests",
      "status": "in_progress",
      "priority": "medium",
      "user_id": 3,
      "created_at": "2026-01-10T...",
      "updated_at": "2026-01-10T..."
    }
  ]
}
```

**Note:** Regular users see only their tasks, admins see all tasks.

---

### 7. Get Single Task

**Endpoint:** `GET /api/v1/tasks/:id`

**Headers Required:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**curl Command:**
```bash
curl http://localhost:5000/api/v1/tasks/1 ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "pending",
    "priority": "high",
    "user_id": 3,
    "created_at": "2026-01-10T...",
    "updated_at": "2026-01-10T..."
  }
}
```

---

### 8. Update Task

**Endpoint:** `PUT /api/v1/tasks/:id`

**Headers Required:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation with examples",
  "status": "in_progress",
  "priority": "high"
}
```

**curl Command:**
```bash
curl -X PUT http://localhost:5000/api/v1/tasks/1 ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Complete project documentation\",\"description\":\"Write comprehensive API documentation with examples\",\"status\":\"in_progress\",\"priority\":\"high\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation with examples",
    "status": "in_progress",
    "priority": "high",
    "user_id": 3,
    "created_at": "2026-01-10T...",
    "updated_at": "2026-01-10T..."
  }
}
```

---

### 9. Delete Task (Admin Only)

**Endpoint:** `DELETE /api/v1/tasks/:id`

**Headers Required:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
```

**curl Command:**
```bash
curl -X DELETE http://localhost:5000/api/v1/tasks/1 ^
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Note:** Only users with `admin` role can delete tasks.

---

## ❌ Common Error Responses

### 400 - Bad Request (Validation Error)
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### 401 - Unauthorized (No Token)
```json
{
  "success": false,
  "message": "Not authorized to access this route. No token provided."
}
```

### 401 - Unauthorized (Invalid Credentials)
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 403 - Forbidden (Insufficient Permissions)
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Task not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Detailed error message"
}
```

---

## 📊 Field Validations

### User Registration
- **username**: 3-50 characters, alphanumeric and underscores only
- **email**: Valid email format
- **password**: Minimum 6 characters
- **role**: Optional, must be 'user' or 'admin', defaults to 'user'

### Task Creation/Update
- **title**: Required, 1-255 characters
- **description**: Optional, text
- **status**: Optional, must be 'pending', 'in_progress', or 'completed'
- **priority**: Optional, must be 'low', 'medium', or 'high'

---

## 🧪 Testing Workflow

1. **Register a User** → Save the token
2. **Login** → Verify credentials work
3. **Create Tasks** → Add multiple tasks
4. **Get All Tasks** → Verify tasks appear
5. **Update a Task** → Change status/priority
6. **Get Single Task** → Verify changes
7. **Register an Admin** → Set role to 'admin'
8. **Delete a Task** → Use admin token

---

## 🔗 Using Postman Collection

Instead of curl, import the Postman collection:

1. Open Postman
2. Click **Import** → **Choose Files**
3. Select: `postman/Backend_Primitive_API.postman_collection.json`
4. Set variables:
   - `baseUrl`: `http://localhost:5000`
   - `token`: (Set after login)
5. Test all endpoints with pre-configured requests!

---

## 💡 Tips

- Always include the `Bearer` prefix before the token
- Tokens expire after 24 hours (configurable in .env)
- Regular users can only see/edit their own tasks
- Admin users can see all tasks and delete any task
- API uses versioning: `/api/v1/...` for future compatibility

---

**Happy Testing! 🚀**
