import { type ReactNode } from "react"
import { Link } from "react-router-dom"

interface IDefaultLayout {
  children: ReactNode
}

export default function DefaultLayout({ children }: IDefaultLayout) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/singup">Singup</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

    </>
  )
}
