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

# 🚀 Installation and Setup

Follow the steps below to set up and run the Blockchain-Based Academic Credential Verification System locally.

## 📋 Prerequisites

Before starting the project, make sure the following are installed or available:

- Node.js
- npm
- Git
- Visual Studio Code
- MongoDB Atlas Account
- Polygon Amoy Wallet
- Polygon Amoy Test POL

Check the installed versions:

```bash
node -v
npm -v
git --version

##1. Clone the Repository
Open Terminal and clone the project:
git clone https://github.com/samalapranavi09/Blockchain-Credential-Verification.git

Navigate to the project directory:
cd Blockchain-Credential-Verification

The project contains separate frontend and backend applications:
Blockchain-Credential-Verification/
├── frontend/
├── backend/
└── README.md

##2. Open the Project in Visual Studio Code
Open the project in VS Code:
code .

If the code command is not available, open Visual Studio Code manually and select:
File → Open Folder → Blockchain-Credential-Verification

##🗄️ 3. MongoDB Atlas Setup
The application uses MongoDB Atlas to store academic credential and administrator information.
Step 1: Create a MongoDB Atlas Account
Create or log in to your MongoDB Atlas account.
Step 2: Create a Cluster
Create a MongoDB Atlas cluster for the project.
Step 3: Create a Database User
Create a database username and password.
Step 4: Configure Network Access
In MongoDB Atlas, go to:
Security
   ↓
Network Access
   ↓
Add IP Address

Add the IP address required for your development or deployment environment.
Step 5: Get the Connection String
Go to:
Database
   ↓
Connect
   ↓
Drivers

Copy the MongoDB connection string.
It will look similar to:
mongodb+srv://username:password@cluster.mongodb.net/database

Important: Never publish your MongoDB username, password, or complete connection string on GitHub.

##⚙️ 4. Backend Setup
Open a new Terminal window.
Navigate to the backend folder:
cd Blockchain-Credential-Verification/backend

Install the backend dependencies:
npm install

##5. Configure Backend Environment Variables
Inside the backend folder, create a file named:
.env

Add the following configuration:
PORT=5001

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secure_jwt_secret

PRIVATE_KEY=your_blockchain_private_key

POLYGON_AMOY_RPC_URL=https://polygon-amoy-bor-rpc.publicnode.com

CONTRACT_ADDRESS=0xD2974C62B715f3871F9C7dDED1d1fE8A43F11DD8

Replace the placeholder values with your own credentials.
Environment Variables
Variable	Purpose
PORT	Backend server port
MONGO_URI	MongoDB Atlas connection string
JWT_SECRET	Secret used for JWT authentication
PRIVATE_KEY	Blockchain wallet private key used for transactions
POLYGON_AMOY_RPC_URL	Polygon Amoy RPC endpoint
CONTRACT_ADDRESS	Deployed Solidity smart contract address


Security: Never commit .env or private keys to GitHub.

Make sure .gitignore contains:
.env
node_modules/
build/

##▶️ 6. Start the Backend
From the backend directory, run:
npm start

The backend will run on:
http://localhost:5001

You should see a message similar to:
Server running on port 5001
MongoDB Connected

Test the Backend
Open the following URL in your browser:
http://localhost:5001

The expected response is:
{
  "message": "Blockchain Credential Verification API is running"
}

##⛓️ 7. Polygon Amoy Setup
The project uses the Polygon Amoy Testnet for blockchain-based credential integrity verification.
Network Details
Network: Polygon Amoy Testnet
Chain ID: 80002
Gas Token: POL

The deployed smart contract is:
0xD2974C62B715f3871F9C7dDED1d1fE8A43F11DD8

The smart contract stores:
- Credential ID
- Certificate Hash
- Timestamp
- Credential existence status
The blockchain wallet configured in the backend must contain sufficient Amoy POL to submit transactions.

##💻 8. Frontend Setup
Open another Terminal window.
Navigate to the frontend directory:
cd Blockchain-Credential-Verification/frontend

Install the frontend dependencies:
npm install

##🔧 9. Configure Frontend Environment Variables
Inside the frontend folder, create:
.env

For local development, add:
REACT_APP_API_URL=http://localhost:5001

This tells the React application to communicate with the local Express backend.

##▶️ 10. Start the Frontend
From the frontend directory, run:
npm start

The React application will be available at:
http://localhost:3000

If the browser does not open automatically, open the URL manually.

##🖥️ 11. Run Frontend and Backend
Two terminals are required during local development.
Terminal 1 — Backend
cd Blockchain-Credential-Verification/backend
npm start

Backend:
http://localhost:5001

Terminal 2 — Frontend
cd Blockchain-Credential-Verification/frontend
npm start

Frontend:
http://localhost:3000

The overall local architecture is:
React Frontend
      │
      ▼
Node.js + Express Backend
      │
      ├──────────────► MongoDB Atlas
      │
      └──────────────► Polygon Amoy

##🔐 12. Login to the Application
Open:
http://localhost:3000

Navigate to:
University Login

Enter the administrator credentials configured for the application.
After successful authentication, the user is redirected to the Dashboard.

##📜 13. Issue an Academic Credential
From the Dashboard, select:
Issue Credential

Enter the required information:
- Student Name
- Roll Number
- Degree
- Department
- Institution
- Issue Date
After submission, the system:
Credential Information
        ↓
Credential ID Generation
        ↓
SHA-256 Hash Generation
        ↓
MongoDB Atlas Storage
        ↓
Polygon Blockchain Storage
        ↓
QR Verification Link

##🔒 14. SHA-256 Hash Generation
The backend generates a SHA-256 hash from the credential information.
The hash acts as a digital fingerprint of the credential data.
Credential Data
      ↓
   SHA-256
      ↓
Certificate Hash

The hash is stored in:
MongoDB Atlas
      +
Polygon Blockchain

Important: The current implementation validates the uploaded certificate PDF on the frontend, but the PDF itself is not currently stored or hashed as a document. The backend SHA-256 hash is generated from the credential data fields.

##🔍 15. Verify a Credential
Go to:
Verify Credential

Enter the Credential ID.
Example:
BCV-2026-747207

The system performs the following verification process:
Credential ID
      ↓
Retrieve Credential
      ↓
Recalculate SHA-256 Hash
      ↓
Compare MongoDB Hash
      ↓
Read Blockchain Hash
      ↓
Compare Blockchain Hash
      ↓
Check Credential Status
      ↓
Verification Result

Possible results include:
✅ Credential Verified

❌ Credential Not Found

⚠️ Credential Integrity Check Failed

🚫 Credential Revoked

##📱 16. QR Code Verification
A QR verification link is generated for issued credentials.
The QR code contains a verification URL with the Credential ID.
Example:
https://your-domain.com/verify?credentialId=BCV-2026-747207

Users can scan the QR code using a mobile phone to open the verification page.
The QR code does not contain the complete certificate.

##🛡️ 17. Test Tamper Detection
The tamper detection feature can be demonstrated as follows.
Step 1
Issue a new academic credential.
Step 2
Verify the credential.
Expected result:
Credential Verified

Step 3
Open the credential record in MongoDB Atlas.
Modify one field, for example:
Student Name

Step 4
Verify the same Credential ID again.
The system recalculates the SHA-256 hash.
Because the credential data has changed:
Original Hash ≠ Recalculated Hash

The system should report an integrity failure.
Step 5
Restore the original data.
Verify the credential again.
The credential should be successfully verified.

##❌ 18. Test Invalid Credential
Enter a Credential ID that does not exist.
Example:
BCV-2026-999999

Expected result:
Credential Not Found

##🚫 19. Test Credential Revocation
The system supports credential status management.
A credential can have one of the following statuses:
Valid
Revoked

A revoked credential should not be treated as a valid credential during verification.

##🔓 20. Test Logout and Protected Routes
After logging in, click:
Logout

Then try to directly access:
http://localhost:3000/dashboard

The protected route should prevent unauthorized access and redirect the user to the login page.

##☁️ 21. Production Deployment
The backend can be deployed using Render.
The production architecture is:
React Frontend
      ↓
Render Backend
      ↓
MongoDB Atlas
      ↓
Polygon Amoy

Production backend:
https://blockchain-credential-verification-murt.onrender.com

For production frontend configuration, use:
REACT_APP_API_URL=https://blockchain-credential-verification-murt.onrender.com

After changing the frontend environment variable, restart or redeploy the frontend application.

##🧪 22. Testing Checklist
Before demonstrating the project, verify the following:
- [ ] MongoDB Atlas connection works
- [ ] Backend starts successfully
- [ ] Frontend starts successfully
- [ ] Administrator login works
- [ ] Dashboard loads correctly
- [ ] Credential can be issued
- [ ] Credential ID is generated
- [ ] SHA-256 hash is generated
- [ ] Credential is stored in MongoDB Atlas
- [ ] Blockchain transaction succeeds
- [ ] Transaction appears on PolygonScan
- [ ] QR code is generated
- [ ] QR verification works
- [ ] Valid credential verification works
- [ ] Invalid credential detection works
- [ ] Tamper detection works
- [ ] Credential revocation works
- [ ] Logout works
- [ ] Protected routes work

## 🎓 23. Recommended Project Demonstration Flow
For the final project demonstration, follow this order:
Home Page
    ↓
University Login
    ↓
Dashboard
    ↓
Issue Credential
    ↓
Show Credential ID
    ↓
Show SHA-256 Hash
    ↓
Show MongoDB Atlas Record
    ↓
Show Polygon Blockchain Transaction
    ↓
Show QR Code
    ↓
Scan QR Code
    ↓
Verify Credential
    ↓
Demonstrate Tampering
    ↓
Show Verification Failure
    ↓
Restore Original Data
    ↓
Verify Again
    ↓
Logout
    ↓
Demonstrate Protected Route

## ⚠️ 24. Important Note About IPFS
The current implemented application does not use IPFS.
The accompanying IEEE research paper proposes IPFS as part of an extended academic credential verification framework.
The current project uses:
MongoDB Atlas
      +
SHA-256
      +
Polygon Amoy
      +
Solidity Smart Contract
      +
QR Verification

The proposed research framework additionally includes:
IPFS
      +
AI-Based Visual Verification
      +
Digital Credential Wallet
      +
OTP-Based Controlled Sharing

Therefore, IPFS is considered a proposed/future enhancement and is not required to run the current implementation.

## 🔐 25. Security Guidelines
Never upload the following information to GitHub:
.env files
MongoDB passwords
JWT secrets
Blockchain private keys
Database credentials
Access tokens

If any private credential is accidentally exposed, immediately replace or rotate it.

## 📌 26. Final Project Architecture
                    UNIVERSITY ADMIN
                           │
                           ▼
                    React Frontend
                           │
                           ▼
                  Node.js + Express
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       MongoDB Atlas              Polygon Amoy
              │                         │
              │                  Credential ID
              │                         +
              │                    SHA-256 Hash
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
                       QR Code
                           │
                           ▼
                  Credential Verification

✅ Setup Complete
If all the above steps are completed successfully, the application should be available at:
Frontend:
http://localhost:3000

Backend:
http://localhost:5001
