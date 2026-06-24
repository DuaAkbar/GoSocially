import { imageUpload } from "../utilities/cloudnary-utilities.js";

export const uploadMedia = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result =await imageUpload(url);
    res.status(200);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    
    console.log(error);

    res.status(500);
    res.json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
