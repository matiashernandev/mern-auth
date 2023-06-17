/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from "react-router-dom"
import { type MouseEvent } from "react"
import type React from "react"
import { useAuth } from "../auth/AuthProvider"
import { API_URL } from "../auth/constants"

interface PortalLayoutProps {
  children?: React.ReactNode
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth()

  async function handleSignOut(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`
        }
      })
      if (response.ok) {
        auth.signout()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/me">Profile</Link>
            </li>
            <li>
              <Link to="/me">{auth.getUser()?.username ?? ""}</Link>
            </li>
            <li>
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="dashboard">{children}</main>
    </>
  )
}