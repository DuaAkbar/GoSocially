# GoSocialy 🌐

A full-stack social media web application built with the MERN stack, where users can share posts, interact through comments, and manage their own content.

## 🚀 Features

- JWT-based Authentication (Register & Login)
- Create, Edit, and Delete Posts
- Image uploads via Cloudinary
- Comment on Posts
- Public & Private post visibility
- Responsive UI with Tailwind CSS
- User Profile support

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Other:** Cloudinary (image uploads), JWT (authentication)

## 📁 Project Structure
socialMediaMern/

├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
└── src/
├── components/
├── context/
└── pages/

## ⚙️ Getting Started

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the `backend` folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

## 👤 Author
**Dua Akbar** — MERN Stack Developer
