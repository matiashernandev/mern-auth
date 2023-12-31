import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import loginRouter from './routes/login.js';
import refreshTokenRouter from './routes/refreshToken.js';
import signoutRouter from './routes/signout.js';
import signupRouter from './routes/signup.js';
import userRouter from './routes/user.js';
import todosRouter from './routes/todos.js';
import { authenticateToken } from './auth/authenticate.js';

config()

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

async function main() {
  await mongoose.connect(process.env.BD_CONNECTION_STRING)
  console.log("Connected to mongodb")
}

main().catch(console.error)

app.use("/api/signout", signoutRouter)
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/refresh-token', refreshTokenRouter);
app.use('/api/user', authenticateToken, userRouter);
app.use('/api/todos', authenticateToken, todosRouter);

app.get("/", (req, res) => {
  res.send("Sarasa")
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

