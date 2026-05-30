import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://realtimechatapp-jnze.onrender.com",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// 👇 connect DB first, then start server
connectDb().then(() => {
  server.listen(port, () => {
    console.log("server started on port", port);
  });
});
