import { Router } from "express";
import jsonResponse from "../lib/jsonResponse.js";

const router = Router()

router.post("/", (req, res) => {
  const { username, password } = req.body

  if (!!!username || !!!password) {
    return res.status(400).json(jsonResponse(400, {
      error: "Fields are required"
    }))
  }


  const accessToken = "access_token"
  const refreshToken = "refresh_token"
  const user = {
    id: "1",
    name: "John",
    username: "XXXX"
  }

  res.status(200).json(jsonResponse(200, { user, accessToken, refreshToken }))
})


export default router