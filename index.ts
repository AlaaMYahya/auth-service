import CookieParam from "cookie-parser";
import express from "express";
import cors from "cors";
import { app } from "./src/app";


app.use(express.json());
app.use(CookieParam());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080' ], 
  credentials: true 
})
);

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
