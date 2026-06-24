import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const CreateUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    if (!userName || !userEmail || !userPassword) {
      res.status(404);
      res.json({
        success: false,
        message: "All fields are required!",
      });
      return;
    }

    const userFound = await User.findOne({
      $or: [{ userEmail }, { userName }],
    });

    if (userFound) {
      res.status(409);
      res.json({
        success: false,
        message: "User already exists!",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(userPassword, 12);

    const createNewUser = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
    });

    res.status(201);
    res.json({
      success: true,
      message: "User Created Successfully!",
      userId: createNewUser?._id,
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(404);
      res.json({
        success: false,
        message: "All fields are requrired ",
      });
      return;
    }

    const userFound = await User.findOne({
      userEmail,
    });

    if (!userFound) {
      res.status(404);
      res.json({
        success: false,
        message: "Account does not exists!",
      });
      return;
    }

    if (await bcrypt.compare(userPassword, userFound.userPassword)) {
      const token = jwt.sign(
        {
          userId: userFound._id,
          userName: userFound.userName,
          userEmail: userFound.userEmail,
          userPassword: userFound.userPassword,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "120m" },
      );

      res.status(200);
      res.json({
        success: true,
        token,
        message: "LoggedIn Successfully",
        userId : userFound._id,
        userName : userFound?.userName,
         userEmail: userFound?.userEmail,
      });

      return;
    } else {
      res.status(401);
      res.json({
        success: false,
        message: "Invalid Password",
      });
      return;
    }
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: e.message || "Internal Server Error",
    });
  }
};

export const checkAuth = (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(401);
    res.json({
      success: false,
      message: "Token Required!",
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) {
      res.status(401);
      res.json({
        success: false,
        message: "Invalid Token",
      });
      return;
    } else {
      res.status(200);
      res.json({
        sucess: true,
        message: "Valid Token",
      });
      return;
    }
  });
};
