import { Router } from "express";
import fs from "fs";

const router = Router();

router.get("/recordings", (_, res) => {
  const files = fs.readdirSync("uploads/");

  const filePaths = files.filter((file) => {
    return !file.endsWith(".wav");
  });

  res.status(200).json({
    file_paths: filePaths,
  });
});

export default router;
