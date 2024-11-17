# Task Management Application
A simple Task Management Application built using React.js for the frontend and Express.js for the backend. This app allows users to create, view, edit, delete tasks, and mark them as complete.

### Features
Create, view, edit, and delete tasks.
Mark tasks as complete.
Format due dates for better readability.
Installation and Setup
## 1. Clone the Repository
git clone https://github.com/Nikhil-Palem/Task_App
cd task-management
## 2. Install Dependencies
### Frontend
npm install
### Backend
cd backend
npm install
## 3. Environment Variables
Create a .env file in the server directory:
PORT=5000
DB_URL=your_database_connection_url
## Running the Application
### 1. Start the Backend

cd backend
nodemon index.js
### 2. Start the Frontend

npm start
## API Endpoints
GET	/getTasks	Fetch all tasks
POST	/createTask	Create a new task
PATCH	/editTask/:id	Edit a specific task
DELETE	/delete/:id	Delete a specific task
PATCH	/complete/:id	Mark task as complete
## Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: PostgreSQL
Date Formatting: Moment.js