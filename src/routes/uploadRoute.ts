import { Router } from "express";
import multer from "multer";
import transcription from "../services/transcription";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    // strip whitespace and replace with underscore
    const name = file.originalname.replace(/\s/g, "_");

    // add timestamp to filename
    cb(null, Date.now() + "-" + name);
  },
});

const uploadMiddleware = multer({ storage: storage });

router.post("/upload", uploadMiddleware.single("video"), async (req, res) => {
  console.log(req.file);
  const trans = await transcription(req.file!.path);
  const path = req.file!.path.slice(8); // remove "uploads/" from path

  // save transcription as json next to where video is stored
  fs.writeFileSync(
    `${req.file!.path.slice(0, -4)}.json`,
    JSON.stringify({
      name: req.file!.originalname,
      transcription: trans,
    }),
    { encoding: "utf8" },
  );

  res.status(200).json({
    name: req.file!.originalname,
    path: `/${path}`,
    transcription: trans,
  });
});

export default router;
