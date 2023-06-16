/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useAuth } from "../auth/AuthProvider"

export default function Dashboard() {
  const auth = useAuth()

  return (
    <div>Dashboard {auth.getUser()?.name ?? ""}</div>
  )
}
