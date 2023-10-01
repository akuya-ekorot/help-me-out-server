import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import uploadRoute from "./routes/uploadRoute";
import recordingsRoute from "./routes/recordingsRoute";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use("/api", uploadRoute);
app.use("/api", recordingsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
