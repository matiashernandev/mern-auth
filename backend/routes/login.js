import { Router } from "express";
import jsonResponse from "../lib/jsonResponse.js";
import User from '../schema/user.js'
import { getUserInfo } from "../lib/getUserInfo.js";

const router = Router()

router.post("/", async (req, res) => {
  const { username, password } = req.body

  if (!!!username || !!!password) {
    return res.status(400).json(jsonResponse(400, {
      error: "Fields are required"
    }))
  }

  const user = await User.findOne({ username })

  if (user) {
    const correctPassword = await user.comparePassword(password, user.password)

    if (correctPassword) {


      const accessToken = user.createAccessToken()
      const refreshToken = await user.createRefreshToken()


      res.status(200).json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }))
    } else {

      res.status(400).json(
        jsonResponse(400, {
          error: "User or password incorrect"
        })
      )
    }

  } else {
    res.status(400).json(
      jsonResponse(400, {
        error: "User not found"
      })
    )
  }





})


export default router