import bcrypt from "bcrypt";
import User from "../models/User.js";

export const userUpdate = async (req, res) => {
  try {
    const { userName, userEmail } = req.body;
    const { userId } = req.params;

    if (!userName || !userEmail) {
      return res.status(404).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User Does Not Exists",
      });
    }

    await User.findByIdAndUpdate(userId, { userName, userEmail });

    const userUpdated = await User.findById(userId);

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
      userData: {
        id: userUpdated._id,         
        userName: userUpdated.userName, 
        userEmail: userUpdated.userEmail,
      },
    });
  } catch (error) {
    return res.status(500).json({    
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const userPasswordUpdate = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { userId } = req.params;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "All Fields Are Required",
      });
    }

    if (newPassword !== confirmPassword) { 
      return res.status(400).json({
        success: false,
        message: "Password And Confirm Password Must Be Same",
      });
    }

    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User Does Not Exists",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, userFound.userPassword);

    if (isPasswordCorrect) {  
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(userId, { userPassword: hashedPassword });
      return res.status(200).json({
        success: true,
        message: "Account Password Updated Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};