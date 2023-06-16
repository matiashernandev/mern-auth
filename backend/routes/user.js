import { Router } from "express";
import jsonResponse from "../lib/jsonResponse.js";

const router = Router()

router.get("/", (req, res) => {
  res.status(200).json(jsonResponse(200, req.user))
})


export default router