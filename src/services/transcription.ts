import fs from "fs";
import { execSync as exec } from "child_process";
import deepgram from "../config/deepgram";
import ffmpegStatic from "ffmpeg-static";

function ffmpeg(command: string) {
  return exec(`${ffmpegStatic} ${command}`);
}

async function transcribeLocalVideo(filePath: string) {
  ffmpeg(`-i ${filePath} -hide_banner -y -i ${filePath} ${filePath}.wav`);

  const file = {
    buffer: fs.readFileSync(`${filePath}.wav`),
    mimetype: "audio/wav",
  };

  const response = await deepgram.transcription.preRecorded(file, {
    punctuation: true,
  });

  return response.results;
}

export default transcribeLocalVideo;
