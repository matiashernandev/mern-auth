import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <DefaultLayout>
      <form className="form">
        <h1>Login</h1>

        <label >Username</label>
        <input onChange={(e) => { setUsername(e.target.value) }} type="text" />

        <label >Password</label>
        <input onChange={(e) => { setPassword(e.target.value) }} type="password" />

        <button>Login</button>
      </form>
    </DefaultLayout>
  )
}
