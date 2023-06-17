/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthProvider"
import { API_URL } from "../auth/constants"
import PortalLayout from "../layout/PortalLayout"

interface Todos {
  _id: string
  title: string
  completed: boolean
  idUser: string
}

export default function Dashboard() {
  const auth = useAuth()

  const [todos, setTodos] = useState<Todos[]>([])
  const [title, setTitle] = useState("")

  async function loadTodos() {
    try {
      const response = await fetch(`${API_URL}todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {

    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createTodo()
  }
  async function createTodo() {
    try {
      const response = await fetch(`${API_URL}todos`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`
        },
        body: JSON.stringify({
          title
        })

      })

      if (response.ok) {
        const json = await response.json()
        setTodos([json, ...todos])
      } else {

        // mostrar error de conexión
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <PortalLayout>
      <h1>Dashboard {auth.getUser()?.name ?? ""}</h1>

      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="placeholder" onChange={(e) => setTitle(e.target.value)} value={title} />
      </form>

      {todos.map((todo) => (
        <div key={todo._id} >{todo.title}</div>
      ))}

    </PortalLayout>
  )
}
