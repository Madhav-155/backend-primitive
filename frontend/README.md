# Frontend - Task Manager UI

A React-based frontend for the Task Manager API with authentication and CRUD operations.

## Features

- User registration and login
- JWT token-based authentication
- Protected routes
- Task management (Create, Read, Update, Delete)
- Role-based UI (admin can delete tasks)
- Responsive design
- Error and success message handling

## Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Start Development Server

```bash
npm start
```

The app will run on `http://localhost:3000`

## Available Routes

- `/login` - User login page
- `/register` - User registration page
- `/dashboard` - Protected dashboard with task management

## Environment

The frontend is configured to connect to the backend API at `http://localhost:5000`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
