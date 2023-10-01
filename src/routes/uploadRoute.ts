import { Router } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";

const router = Router();

const uploadMiddleware = multer({ dest: "uploads/" });

router.post("/upload", uploadMiddleware.single("video"), (req, res) => {
  cloudinary.uploader
    .upload_stream({ resource_type: "video" }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Something went wrong uploading the video to the server.",
        });
      }
      return res.status(200).json({ url: result!.secure_url });
    })
    .end(req.file!.buffer);
});
