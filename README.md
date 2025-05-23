﻿# finance-tracker-backend

---
# Finance Tracker Backend

## 📊 Overview

The **Finance Tracker Backend** is a RESTful API designed to help users manage their personal finances by tracking income, expenses, and transactions. It allows users to store and view their financial data securely, providing insights into their spending habits and financial health.

Built with **Node.js**, **Express.js**, and **MongoDB**, this backend provides a solid foundation for creating a complete personal finance management application.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Expense Tracking**: Track income and expenses by category, amount, and date.
- **Transaction History**: View a detailed history of transactions with filtering options.
- **Data Validation**: Ensure correct input with custom validation rules for transactions.
- **Category Management**: Add, edit, and delete financial categories.
- **RESTful API**: Fully built with REST principles, easy to integrate with any frontend or mobile app.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi for data validation
- **Environment Variables**: dotenv for managing sensitive information

---

## 💻 Installation

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Satyendra-official/finance-tracker-backend.git
cd finance-tracker-backend
```

### 2. Install Dependencies

Make sure you have **Node.js** and **npm** installed. Then, run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
PORT=5000                # Server port
MONGO_URI=<your-mongo-uri>   # MongoDB connection string
JWT_SECRET=<your-secret-key>   # Secret key for JWT
```

Replace `<your-mongo-uri>` and `<your-secret-key>` with your actual MongoDB URI and a secret key for JWT authentication.

### 4. Run the Server

Start the backend server by running:

```bash
npm start
```

By default, the server will run on `http://localhost:5000`.

---

## 🛠️ API Endpoints

Here are the main API endpoints provided by the Finance Tracker Backend:

### **User Authentication**

- **POST /api/user/register**  
  Register a new user.  
  _Request body:_  
  ```json
  { "email": "user@example.com", "password": "password123" }
  ```

- **POST /api/user/login**  
  Login an existing user.  
  _Request body:_  
  ```json
  { "email": "user@example.com", "password": "password123" }
  ```

- **GET /api/user/me**  
  Get the current logged-in user's details (requires JWT token in Authorization header).

### **Transactions**

- **POST /api/transactions**  
  Add a new transaction (income or expense).  
  _Request body:_  
  ```json
  {
    "amount": 1500,
    "category": "Salary",
    "date": "2023-04-25",
    "type": "income",
    "description": "Monthly salary"
  }
  ```

- **GET /api/transactions**  
  Get a list of all transactions.  
  _Query params:_  
  - `startDate`: Filter by start date.
  - `endDate`: Filter by end date.
  - `type`: Filter by type (income or expense).

- **GET /api/transactions/:id**  
  Get a single transaction by ID.

- **PUT /api/transactions/:id**  
  Update a transaction by ID.  
  _Request body:_  
  ```json
  {
    "amount": 2000,
    "category": "Freelance",
    "description": "Freelance project payment"
  }
  ```

- **DELETE /api/transactions/:id**  
  Delete a transaction by ID.

### **Categories**

- **GET /api/categories**  
  Get a list of all financial categories.

- **POST /api/categories**  
  Add a new category.  
  _Request body:_  
  ```json
  {
    "name": "Groceries",
    "type": "expense"
  }
  ```

- **DELETE /api/categories/:id**  
  Delete a category by ID.

---

## 🧑‍💻 Example Use Case

1. **User Registration & Login**  
   - A user can register with their email and password.
   - After successful registration, the user can log in and receive a JWT token to authenticate further requests.

2. **Adding Transactions**  
   - After logging in, the user can add income or expense transactions. Each transaction includes a description, amount, type (income/expense), and category.

3. **View Transaction History**  
   - The user can filter transactions by date range and type (income or expense). They can view the details of each transaction.

4. **Managing Categories**  
   - Users can create financial categories like "Rent", "Food", "Salary", etc., to categorize their transactions effectively.

---

## 🔒 Security

- All sensitive data, like passwords, are hashed using **bcrypt** before being stored in the database.
- Authentication is handled through **JWT (JSON Web Tokens)** to ensure secure access to protected routes.
- Always ensure to keep your `JWT_SECRET` and MongoDB credentials secure by using environment variables.

---

## 📈 GitHub Stats

Here’s how you can track the growth of this project over time:

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Satyendra-official&show_icons=true&theme=github_dark" alt="Satyendra's GitHub Stats" height="180" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=Satyendra-official&theme=github-dark&hide_border=false" alt="GitHub Streak" height="180"/>
</p>

---

## 📫 Let's Connect

- 📧 Email: [satyendray2306@gmail.com](mailto:satyendray2306@gmail.com)
- 🐱 GitHub: [github.com/Satyendra-official](https://github.com/Satyendra-official)
- 💼 LinkedIn: [linkedin.com/in/satyendra-kr-yadav](https://www.linkedin.com/in/satyendra-kr-yadav/)

---

> "The best way to predict the future is to invent it." – Alan Kay

Feel free to fork, clone, and contribute to this project!

## Key Changes and Additions:
1. **Introduction & Overview**: Provided a clear description of what the project does and the technologies used.
2. **Tech Stack**: Listed the tech stack so users know what tools are being used.
3. **Installation & Setup**: Detailed step-by-step instructions to run the backend locally.
4. **API Endpoints**: Detailed the various API endpoints with examples for better clarity.
5. **Example Use Case**: Gave users a sample workflow of how they can use the app.
6. **Security**: A quick note on how sensitive data is handled and the importance of environment variables.



