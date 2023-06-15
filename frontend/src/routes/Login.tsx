/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"
import { useAuth } from "../auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import { API_URL } from "../auth/constants"
import { type AuthResponse, type AuthResponseError } from "../types/types"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorResponse, setErrorResponse] = useState("")

  const goTo = useNavigate()

  const { isAuthenticated, saveUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, password
        })
      })

      if (response.ok) {
        console.log("Login success")
        setErrorResponse("")

        const json = (await response.json()) as AuthResponse

        if (json.body.accessToken && json.body.refreshToken) {
          saveUser(json)
          goTo("/dashboard")
        }
      } else {
        console.log("Something went wrong")
        const json = await response.json() as AuthResponseError
        setErrorResponse(json.body.error)
      }
      // const data = await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  if (isAuthenticated) return <Navigate to={"/dashboard"} />

  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label >Username</label>
        <input onChange={(e) => { setUsername(e.target.value) }} type="text" />

        <label >Password</label>
        <input onChange={(e) => { setPassword(e.target.value) }} type="password" />

        <button>Login</button>
      </form>
    </DefaultLayout>
  )
}
