import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"
import { useAuth } from "../auth/AuthProvider"
import { Navigate } from "react-router-dom"

export default function Signup() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to={"/dashboard"} />

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
