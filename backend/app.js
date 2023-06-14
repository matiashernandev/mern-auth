import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const port = process.env.PORT || 5000
const app = express()

app.get("/", (req, res) => {
  res.send("Sarasa")
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

