import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export function verifyAccessToken(token) {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}

export function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  //console.log(decoded)
  return decoded;
}