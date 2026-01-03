# 🩸 Blood Donation Management System (MERN Stack)

A full-stack **Blood Donation Management System** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The platform connects **Donors**, **Patients**, and **Blood Banks** to streamline blood requests, donations, and approvals in real time.

This project is designed for **college projects, internships, and placement-ready resumes**, with real-world workflows, authentication, dashboards, and role-based actions.

---

## 🚀 Features

### 👤 Donor

* Register & Login (JWT + Cookies)
* Manage donor profile
* View donation history (Pending / Approved / Completed)
* Receive blood requests from nearby patients
* Accept or Reject donation requests
* Status-based UI (🟥 Pending | 🟩 Approved)

### 🧑‍⚕️ Patient

* Register & Login
* Request blood (group, location, urgency)
* View nearby donors automatically
* Track request status in real time
* See donor details after approval

### 📊 Dashboard

* Role-based dashboards (Donor / Patient / Blood Bank)
* Visual indicators for request & donation status
* Donation history & request tracking

### 🔐 Authentication & Security

* JWT-based authentication
* Cookie-based session handling
* Protected routes using middleware
* Role-based authorization

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS / CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Middleware-based route protection

### Database

* MongoDB Atlas / Local MongoDB

---

## 🗂 Project Structure

```
blood-donation-app/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.js
│
├── server/                 # Node + Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## 🐳 Docker Support

This project also supports **Docker** for easy setup and deployment.

### 📦 Docker Files Included

* `Dockerfile` for Backend
* `Dockerfile` for Frontend
* (Optional) `docker-compose.yml` for running full stack together

### ▶️ Run Using Docker (Recommended)

```bash
docker build -t blood-donation-backend ./server
docker build -t blood-donation-frontend ./client
```

Run containers:

```bash
docker run -p 5000:5000 --env-file server/.env blood-donation-backend
docker run -p 3000:3000 blood-donation-frontend
```

### ▶️ Run Using Docker Compose

```bash
docker-compose up --build
```

This will start:

* React frontend
* Node.js backend
* MongoDB (if configured)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/blood-donation-mern.git
cd blood-donation-mern
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on: `http://localhost:3000`
Backend runs on: `http://localhost:5000`

---

## 🔄 Application Flow

1. Patient requests blood
2. System finds nearby donors
3. Donor accepts or rejects request
4. If accepted → status becomes **Approved**
5. If no donor available → Blood Bank is notified
6. Donation status updates in real time

---

## 🧪 Sample Roles

| Role      | Actions                                  |
| --------- | ---------------------------------------- |
| Donor     | Accept / Reject requests, View donations |
| Patient   | Request blood, Track status              |

---

## 📸 Screens (Optional)

* Login / Register Page
* Donor Dashboard
* Patient Request Page

---

## 🎯 Use Cases

* College Mini Project
* MERN Stack Practice
* Internship Portfolio Project
* Real-world CRUD + Auth Application

---

## 🧠 Learning Outcomes

* Full MERN stack integration
* JWT & cookie authentication
* Role-based dashboards
* REST API design
* Real-time status handling

---

## 📌 Future Enhancements

* WhatsApp / Email notifications
* Google Maps for donor location
* Admin panel
* Analytics dashboard
* Cloud deployment (AWS / Render / Vercel)

---

## 👨‍💻 Author

**Rodopollu Nagaraju**
B.Tech – Information Technology
MERN Stack Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub and feel free to fork & improve it!

---

> *"Donate Blood, Save Lives."*
