# 🔐 Blockchain-Based Academic Credential Verification System
### B.Tech Minor Project | Department of Computer Science & Engineering (CSE)
**Blockchain Technology | Full-Stack Web Application | Developer Handbook & Setup Guide**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express.js&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Polygon](https://img.shields.io/badge/Polygon-%238247E8.svg?style=for-the-badge&logo=polygon&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/bootstrap-%237952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

---

## 📌 Project Overview

The **Blockchain-Based Academic Credential Verification System** is a full-stack web application designed to provide a secure and reliable method for issuing and verifying academic credentials.

Fake and tampered academic certificates can create serious problems for universities, students, employers, and other organizations. This project provides a digital verification mechanism where academic credential information is stored securely, a **SHA-256 cryptographic hash** is generated, and the hash is recorded on the **Polygon Amoy Blockchain**.

The system allows university administrators to:

- Issue academic credentials
- Generate a unique Credential ID
- Generate a SHA-256 digital fingerprint
- Store complete credential information in MongoDB Atlas
- Store the Credential ID and certificate hash on Polygon blockchain
- Generate a QR code for easy verification
- Verify credentials using Credential ID
- Detect modification or tampering of stored credential information
- Revoke credentials
- View credential history and statistics
- Manage administrator authentication securely using JWT and bcrypt

### 🔄 Main System Flow

Issue Credential
       ↓
Generate Credential ID
       ↓
SHA-256 Hash Generation
       ↓
Store Credential in MongoDB Atlas
       ↓
Store Credential ID + Hash on Polygon
       ↓
Generate QR Verification Link
       ↓
Verify Credential
       ↓
Compare MongoDB Hash + Blockchain Hash
       ↓
Verified / Tampered / Revoked

### 📂 Final Folder Structure

Blockchain Credential Verification/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │       # MongoDB Atlas database connection
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   │   # Admin login and authentication
│   │   └── credentialController.js
│   │       # Credential creation, retrieval,
│   │       # verification and statistics
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │       # JWT authentication middleware
│   │
│   ├── models/
│   │   ├── User.js
│   │   │   # Administrator user schema
│   │   └── Credential.js
│   │       # Academic credential schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   │   # /api/auth routes
│   │   └── credentialRoutes.js
│   │       # /api/credentials routes
│   │
│   ├── services/
│   │   └── blockchainService.js
│   │       # Polygon blockchain integration
│   │
│   ├── .env
│   │   # Private environment variables
│   │
│   ├── .env.example
│   │   # Environment variable template
│   │
│   ├── package.json
│   │   # Backend dependencies
│   │
│   └── server.js
│       # Express server entry point
│
├── frontend/
│   │
│   ├── public/
│   │   └── ...
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   ├── Header.js
│   │   │   ├── DashboardLayout.js
│   │   │   └── ProtectedRoute.js
│   │   │       # Reusable UI and authentication components
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Students.js
│   │   │   ├── IssueCertificate.js
│   │   │   ├── History.js
│   │   │   ├── Verify.js
│   │   │   ├── VerificationHistory.js
│   │   │   └── Settings.js
│   │   │
│   │   ├── App.js
│   │   │   # React route configuration
│   │   │
│   │   ├── index.js
│   │   │   # React application entry point
│   │   │
│   │   └── theme.css
│   │       # Global professional UI styling
│   │
│   ├── .env
│   │   # Frontend API configuration
│   │
│   ├── package.json
│   │   # Frontend dependencies
│   │
│   └── public/
│
├── blockchain/
│   │
│   ├── contracts/
│   │   └── CredentialRegistry.sol
│   │       # Solidity smart contract
│   │
│   ├── scripts/
│   │   └── deploy.js
│   │       # Smart contract deployment script
│   │
│   ├── hardhat.config.js
│   │   # Polygon Amoy configuration
│   │
│   ├── package.json
│   │
│   └── .env
│       # Blockchain deployment credentials
│
└── README.md
    # Project documentation

### 🛠️ Technology Stack

| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| React.js      | Frontend user interface          |
| JavaScript    | Application programming          |
| Bootstrap 5   | Responsive UI design             |
| React Router  | Frontend navigation              |
| React Icons   | UI icons                         |
| Node.js       | Backend runtime                  |
| Express.js    | REST API development             |
| MongoDB Atlas | Credential and user data storage |
| Mongoose      | MongoDB object modeling          |
| Solidity      | Smart contract development       |
| Polygon Amoy  | Blockchain network               |
| ethers.js     | Blockchain communication         |
| SHA-256       | Credential integrity hashing     |
| JWT           | Administrator authentication     |
| bcryptjs      | Password hashing                 |
| QR Server API | QR code generation               |
| dotenv        | Environment configuration        |
| Git/GitHub    | Version control                  |
| Render        | Backend deployment               |

