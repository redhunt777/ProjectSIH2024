import express from "express";
import { loginClient, registerClient } from "../Controllers/client.c.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  loginClient(req, res);
});

router.post("/signup", async (req, res) => registerClient(req, res));

export default router;
