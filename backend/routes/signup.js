import { Router } from "express";
import jsonResponse from "../lib/jsonResponse.js";

const router = Router()

router.post("/", (req, res) => {
  const { username, name, password } = req.body

  if (!!!username || !!!name || !!!password) {
    return res.status(400).json(jsonResponse(400, {
      error: "Fields are required"
    }))
  }



  res.status(200).json(jsonResponse(200, { message: "User created successfully" }))

})


export default router