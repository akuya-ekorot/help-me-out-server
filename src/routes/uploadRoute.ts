import { Router } from "express";
import multer from "multer";
import transcription from "../services/transcription";

const router = Router();

const uploadMiddleware = multer({ dest: "uploads/" });

router.post("/upload", uploadMiddleware.single("video"), async (req, res) => {
  const trans = await transcription(req.file!.path);

  res.status(200).json({ trans });
});

export default router;
