import { Router } from "express";
import jsonResponse from "../lib/jsonResponse.js";
import { getTokenFromHeader } from './../auth/getTokenFromHeader.js';
import Token from '../schema/token.js'


const router = Router()

router.delete("/", async (req, res) => {

  try {
    const refreshToken = getTokenFromHeader(req.headers)

    console.log("fdsafdsafsa" + refreshToken)
    if (refreshToken) {
      await Token.findOneAndRemove({ token: refreshToken })
      res.status(200).json({ message: "Token deleted" })
    }



  } catch (error) {
    console.log(error)
    res.status(500).json(jsonResponse(500, { error: "Server error" }))
  }

})

export default router