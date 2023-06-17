import { Router } from "express";
import { verifyRefreshToken } from "../auth/verify.js";
import { getTokenFromHeader } from "../auth/getTokenFromHeader.js";
import Token from '../schema/token.js'
import { generateAccessToken } from "../auth/generateTokens.js";
import { getUserInfo } from "../lib/getUserInfo.js";

const router = Router()

router.post("/", async function (req, res) {

  const refreshToken = req.body.refreshToken

  if (!refreshToken) {
    console.log("No se proporcionó token de actualización", refreshToken);
    return res.status(401).json({ error: "Token de actualización no proporcionado" });
  }

  try {
    const tokenDocument = await Token.findOne({ token: refreshToken });

    if (!tokenDocument) {
      return res.status(403).json({ error: "Token de actualización inválido" });
    }
    //! aca está mal (?)

    const payload = verifyRefreshToken(tokenDocument.token);
    const accessToken = generateAccessToken(getUserInfo(payload.user));

    res.status(200).json(accessToken);
  } catch (error) {
    return res.status(403).json({ error: "Token de actualización inválido FFFF" });
  }
});

export default router