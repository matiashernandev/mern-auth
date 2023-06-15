import { Router } from "express";
import jsonResponse from "../lib/jsonResponse.js";

const router = Router()

router.post("/", (req, res) => {


  res.send("signout")
})

export default router