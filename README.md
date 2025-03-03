# Advanced Hospital Management System (HMS)

![Node.js](https://img.shields.io/badge/Node.js-v20.11.1-green)
![Express](https://img.shields.io/badge/Express-v4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-yellow)
![License](https://img.shields.io/badge/License-MIT-red)

A **Hospital Management System (HMS)** backend built with **Node.js, Express, and MongoDB**. This system provides user authentication and hospital CRUD operations.

---

## 🚀 Features
### 🛠 Backend (API)
- **User Authentication**: Secure sign-up & login with JWT.
- **Hospital Management**:
  - Create, read, update, and delete hospitals.
  - List all hospitals or filter by city.
  - Add/update hospital details (description, images, doctors, departments).
- **Logging**: Request logging middleware for debugging.
- **Error Handling**: Consistent error responses.

### 🎨 Frontend (React)
🚧 **Frontend is under construction.** 🚧

---

## 🏗 Tech Stack
| Backend |
|---------|
| Node.js |
| Express.js |
| MongoDB (Atlas) |
| Mongoose |
| JWT (Authentication) |
| Bcrypt (Password Hashing) |

---

## 📥 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/Advanced-Hospital-Management-System.git
cd Advanced-Hospital-Management-System
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```plaintext
DEV_MONGODB_URI=your_mongodb_connection_string
DEV_PORT=4000
DEV_JWT_SECRET_KEY=your_secret_key
ALLOWED_ORIGINS=*
NODE_ENV=DEV
```

Start the backend server:
```bash
npm start
```

---

## 🔗 API Endpoints (Backend)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/v1/auth/signup` | Register a new user |
| POST | `/api/v1/auth/signin` | Authenticate and get JWT token |
| POST | `/api/v1/hospitals/create` | Create a new hospital |
| GET  | `/api/v1/hospitals/all` | Get all hospitals |
| GET  | `/api/v1/hospitals/:city` | Get hospitals by city |
| GET  | `/api/v1/hospitals/single/:id` | Get details of a specific hospital |
| PUT  | `/api/v1/hospitals/update/:id` | Update hospital details |
| DELETE | `/api/v1/hospitals/delete/:id` | Delete a hospital |
| POST | `/api/v1/hospitals/details/:id` | Add or update hospital details |

---

## 🤝 Contributing
Pull requests are welcome! Feel free to open an issue for discussions.

## 📜 License
This project is licensed under the MIT License.

---

### 🔹 **Why This is Perfect for Your GitHub Repo?**
✅ **Backend-only Documentation** (Frontend coming soon).  
✅ **Step-by-Step Installation Guide**.  
✅ **Clear API Endpoints Table**.  
✅ **Structured & Easy to Read**.

Let me know if you need any tweaks! 🚀🔥

