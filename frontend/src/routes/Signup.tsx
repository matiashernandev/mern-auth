/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"
import { useAuth } from "../auth/AuthProvider"
import { Navigate } from "react-router-dom"
import { API_URL } from "../auth/constants"

export default function Signup() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to={"/dashboard"} />

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, username, password
        })
      })

      if (response.ok) {
        console.log("User created successfully")
      } else {
        console.log("Something went wrong")
      }
      // const data = await response.json()
    } catch (error) {

    }
  }

  return (
    <DefaultLayout>

      <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <label >Name</label>
        <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" />

        <label >Username</label>
        <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" />

        <label >Password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" />
        <button>Create user</button>
      </form>
    </DefaultLayout>
  )
}
