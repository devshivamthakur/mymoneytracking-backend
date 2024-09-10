# Budget & Transaction Management API

This project is a backend API built using Node.js, Express, and MongoDB. It allows users to manage budgets, transactions, and categories. The API includes user authentication using JWT (JSON Web Token) for secured routes.

## Table of Contents
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

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
