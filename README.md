# Blog Platform

A full-stack blog application with a NestJS backend API and a Next.js frontend, designed for user authentication, blog post management, and admin functionalities

## Project Structure

This repository is organized into two main folders: 

- **backend**: Contains the NestJS API server, handling authentication, blog post management, and database interactions.

- **frontend**: Contains the Next.js application, providing a user interface for interacting with the blog platform.

## Prerequisites

Before setting up the project, ensure you have the following installed:





- **Node.js (v16 or higher)**



- **npm or pnpm (package manager)**



- **MongoDB (local or cloud instance, e.g., MongoDB Atlas)**



- **A code editor (e.g., VS Code)**

## Backend Setup

1. Navigate to the backend folder.

```bash
cd backend
```

2. Install dependencies

```bash
npm install 
# or
pnpm install
```

3. Create a **.env** file in the **backend** folder with the following variables:

```bash
MONGO_URI=your-mongodb_connection_string
MONGO_DB=db_name
TOKEN_SECRET=your_jwt_secret_key
```
Replace **your_mongodb_connection_string** with your MongoDB connection string (e.g, **mongodb+srv://<username>:** *or* **mongodb://27017/** and other env variable as necessary.

4. Seed the database with initial data
```bash
npm run seed
#or
pnpm run seed
```

5. Start the backend servver in development mode:

```bash
npm run start:dev
#or
pnpm run start:dev
```

## Frontend Setup

1. Navigate to the backend folder.

```bash
cd frontend
```

2. Install dependencies

```bash
npm install 
# or
pnpm install
```

3. Start the backend servver in development mode:

```bash
npm run start:dev
#or
pnpm run start:dev
```

## Usage

1. Start the Backend and Frontend:

- Follow the setup instructions above to start both servers.

- Backend: **http://localhost:3001**

- Frontend: **http://localhost:3000**

2. Admin Login: 

- After running the seed script , use the following credentials to log in as an admin: 

- Username: **admin**
- Password: **admin123**

## Functionality
- Normal user can view the blog posted by admin.

- Admin can view, edit, delete and create the new blogs.

- All the users can navigate to the individual blog page where content are displayed.






