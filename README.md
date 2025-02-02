Certainly! Here's how you can update your `README.md` to include the Swagger documentation information:

```markdown
# Budget & Transaction Management API

This project is a backend API built using Node.js, Express, and MongoDB. It allows users to manage budgets, transactions, and categories. The API includes user authentication using JWT (JSON Web Token) for secured routes.

## Table of Contents
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Swagger API Documentation](#swagger-api-documentation)

## Features
- User authentication using JWT.
- CRUD operations for managing budgets and transactions.
- Filter transactions by date, category, and more.
- Protected routes for managing transactions and budgets.
- Category retrieval for budget planning.

## API Endpoints

### User Routes
- `POST /api/v1/users/login` - Login a user and return a JWT token.

### Budget Routes (Protected)
- `POST /api/v1/budget/create` - Create a new budget.
- `GET /api/v1/budget/info` - Get detailed information about the current budget.

### Category Routes (Protected)
- `GET /api/v1/category` - Retrieve all available categories.

### Transaction Routes (Protected)
- `POST /api/v1/transaction/add` - Add a new transaction.
- `GET /api/v1/transaction/info` - Get information about a specific transaction.
- `DELETE /api/v1/transaction/delete` - Delete a transaction.
- `POST /api/v1/transaction/filter` - Filter transactions by criteria such as date and category.

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- Node.js (v14.x or above)
- MongoDB (running locally or using MongoDB Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/budget-transaction-api.git
   ```

2. Install the dependencies:
   ```bash
   cd budget-transaction-api
   npm install
   ```

3. Set up environment variables in a `.env` file. Example:
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/budget-db
   JWT_SECRET=your-secret-key
   ```

4. Run the application:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`.

## Swagger API Documentation

This project uses **Swagger UI** to provide interactive documentation for the API.

You can access the API documentation at the following URL after running the application:

```
http://localhost:3000/api-docs
```

Here you can:
- Explore all available API endpoints.
- View detailed information about each endpoint.
- Test API routes interactively by sending requests directly from the Swagger UI.

## Environment Variables

The following environment variables are required to run the application:

- `PORT`: The port on which the server will run (default: 3000).
- `MONGODB_URI`: The connection string for MongoDB.
- `JWT_SECRET`: Secret key used to sign the JWT token.

## Project Structure
```
/config               # Configuration files
/controllers          # API route handlers
/models               # Mongoose models
/routes               # API route definitions
/middleware           # Authentication middleware
/utils                # Utility functions (e.g., validation)
```

## Technologies Used
- Node.js
- Express
- MongoDB
- JWT (JSON Web Token)
- Swagger UI
```

This update includes the Swagger documentation section, along with details on how to access it. Now, anyone reading your `README.md` will be able to easily access the interactive API documentation by navigating to `http://localhost:3000/api-docs`.