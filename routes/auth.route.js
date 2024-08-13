import express from "express";
import { login, logout, register } from "../controller/auth.controller.js";

const router = express.Router();

router.get('/register', register)

router.get("/login", login);

router.get("/logout", logout);

export default router