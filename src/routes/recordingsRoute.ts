import { Router } from "express";
import fs from "fs";

const router = Router();

router.get("/recordings", (_, res) => {
  const files = fs
    // read the uploads folder
    .readdirSync("uploads/")
    // filter out the .wav and .json files
    .filter((file) => {
      return !file.endsWith(".wav") && !file.endsWith(".json");
    })
    // group the files by name and return the name and the transcription
    .map((file) => {
      const transcription = JSON.parse(
        fs.readFileSync(`uploads/${file.slice(0, -4)}.json`, "utf-8"),
      );

      const name = transcription.name;
      const trans = transcription.transcription;

      return {
        name: name,
        path: `/${file}`,
        transcription: trans,
      };
    });

	console.log(files);

  res.status(200).json({
    files,
  });
});

export default router;
