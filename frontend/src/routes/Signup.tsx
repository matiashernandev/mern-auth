import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"

export default function Signup() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <DefaultLayout>
      <form className="form">
        <h1>Signup</h1>
        <label >Name</label>
        <input onChange={(e) => { setName(e.target.value) }} type="text" />

        <label >Username</label>
        <input onChange={(e) => { setUsername(e.target.value) }} type="text" />

        <label >Password</label>
        <input onChange={(e) => { setPassword(e.target.value) }} type="password" />
        <button>Create user</button>
      </form>
    </DefaultLayout>
  )
}
