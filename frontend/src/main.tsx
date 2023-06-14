import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./routes/Signup.tsx"
import Dashboard from "./routes/Dashboard.tsx"
import ProtectedRoute from "./routes/ProtectedRoute.tsx"
import AuthProvider from "./auth/AuthProvider.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
)
