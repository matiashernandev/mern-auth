import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {
  res.send("refresh-token")
})


export default router