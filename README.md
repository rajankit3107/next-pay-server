# 💰 Paytm Clone - Digital Payment System

A full-stack digital payment system built with Node.js, Express, TypeScript, and MongoDB, featuring user authentication, account management, and money transfer capabilities.

## 🚀 Features

### User Management

- **User Registration & Authentication**: Secure signup and signin with JWT tokens
- **User Profile Management**: Update user information
- **User Search**: Filter users by first name and last name
- **Password-based Authentication**: Secure login system

### Account Management

- **Account Creation**: Automatic account creation for new users with random initial balance
- **Balance Checking**: Get current account balance
- **Money Transfer**: Transfer money between users with balance validation

### Security Features

- **JWT Authentication**: Secure token-based authentication
- **Middleware Protection**: Protected routes with authentication middleware
- **Input Validation**: Zod schema validation for all inputs
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Tech Stack

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: JSON Web Tokens for authentication
- **Zod**: Schema validation
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development Tools

- **pnpm**: Package manager
- **TypeScript Compiler**: Type checking and compilation

## 📁 Project Structure

```
paytm/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── userController.ts      # User management logic
│   │   │   └── accountController.ts   # Account and transfer logic
│   │   ├── middleware/
│   │   │   └── authmiddleware.ts      # JWT authentication middleware
│   │   ├── models/
│   │   │   └── model.ts               # MongoDB schemas
│   │   ├── routers/
│   │   │   ├── index.ts               # Main router
│   │   │   ├── user.ts                # User routes
│   │   │   └── account.ts             # Account routes
│   │   ├── validators/
│   │   │   └── validators.ts          # Zod validation schemas
│   │   ├── config.ts                  # Database configuration
│   │   └── index.ts                   # Server entry point
│   ├── dist/                          # Compiled JavaScript files
│   ├── package.json                   # Dependencies and scripts
│   └── tsconfig.json                  # TypeScript configuration
└── README.md                          # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd paytm
   ```

2. **Install dependencies**

   ```bash
   cd backend
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend` directory:

   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/paytm
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the server**
   ```bash
   pnpm dev
   ```

The server will start on `http://localhost:8000`

## 📚 API Documentation

### Base URL

```
http://localhost:8000/api/v1
```

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Endpoints

#### 1. User Registration

```http
POST /user/signup
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "message": "user created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. User Login

```http
POST /user/signin
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Update User Profile

```http
PUT /user/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Johnny",
  "lastName": "Smith"
}
```

**Response:**

```json
{
  "message": "User updated successfully"
}
```

#### 4. Search Users

```http
GET /user/bulk?firstName=John&lastName=Doe
Authorization: Bearer <token>
```

**Response:**

```json
{
  "users": [
    {
      "username": "john_doe",
      "firstName": "John",
      "lastName": "Doe"
    }
  ]
}
```

### Account Endpoints

#### 1. Get Account Balance

```http
GET /account/balance
Authorization: Bearer <token>
```

**Response:**

```json
{
  "balance": 5000.5
}
```

#### 2. Transfer Money

```http
POST /account/transfer
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 1000,
  "to": "recipient_user_id"
}
```

**Response:**

```json
{
  "message": "Transfer successful"
}
```

## 🔧 Development

### Available Scripts

```bash
# Build TypeScript to JavaScript
pnpm build

# Start development server
pnpm dev

# Build and start production server
pnpm build && node dist/index.js
```

### Database Schema

#### User Schema

```typescript
{
  username: String (required, unique),
  password: String (required),
  firstName: String,
  lastName: String,
  timestamps: true
}
```

#### Account Schema

```typescript
{
  userId: ObjectId (ref: User, required),
  balance: Number (required)
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Protection**: Passwords are stored securely
- **Input Validation**: All inputs are validated using Zod schemas
- **Error Handling**: Comprehensive error handling prevents information leakage
- **CORS**: Configured for cross-origin requests

## 🚨 Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (invalid token)
- `404` - Not Found (user/account not found)
- `500` - Internal Server Error

## 🔄 Transaction Support

**Note**: The current implementation works with standalone MongoDB. For production use with transactions:

1. **Use MongoDB Atlas** (recommended)
2. **Set up a local replica set**
3. **Update the connection string** to include replica set configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ankit Raj**

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the error logs in the console
2. Verify your MongoDB connection
3. Ensure all environment variables are set correctly
4. Check that the JWT token is valid and properly formatted

---

**Happy Coding! 🎉**
