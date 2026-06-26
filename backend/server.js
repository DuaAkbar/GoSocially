import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import postRouter from "./routes/postRoute.js";
import mediaRouter from "./routes/mediaRoute.js";
import cors from "cors";
import connectToDb from "./database/DatabaseConnection.js";
import commentsRouter from "./routes/commentsRouter.js";
import profileRouter from "./routes/profileRoutes.js";
dotenv.config();
const port = process.env.PORT || 4500;
connectToDb();

const server = express();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://go-socially-five.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
server.use(cors({
    origin: "https://go-socially-five.vercel.app",  // Your frontend URL (remove trailing slash)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization"  // Add this!
    ],
    credentials: true  // Optional: if you need to send cookies
}))
server.use(express.json());
server.options('*', cors());
server.use("/api/v1/auth", authRouter);

server.use((req, res, next) => {
  let token = req?.headers?.authorization || req?.headers?.Authorization;
  let jwtToken = token?.split(" ")[1];

  if (!jwtToken) {
    res.status(401);
    res.json({
      success: false,
      message: "Token Required!",
    });
    return;
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) {
      res.status(401);
      res.json({
        success: false,
        message: "Invalid Token!",
      });
      return;
    } else {
      next();
    }
  });
});
server.use("/api/v1/posts", postRouter);
server.use("/api/v1/media" , mediaRouter);
server.use("/api/v1/comments", commentsRouter);
server.use("/api/v1/profile", profileRouter);

server.listen(port, () => {
  console.log(`Server is running on Port:${port}`);
});
