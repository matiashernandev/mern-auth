/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createContext, useContext, useState } from "react"
import { type AuthResponse } from "../types/types"

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => { },
  saveUser: (userData: AuthResponse) => { },
  getRefreshToken: () => { }
})

interface IAuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState<string>("")
  // const [refreshToken, setRefreshToken] = useState<string>("")

  function getAccessToken() {
    return accessToken
  }

  function getRefreshToken() {
    const token = localStorage.getItem("token")
    if (token) {
      const { refreshToken } = JSON.parse(token)
      return refreshToken
    }
  }

  function saveUser(userData: AuthResponse) {
    setAccessToken(userData.body.accessToken)
    // setRefreshToken(userData.body.refreshToken)

    localStorage.setItem("token", JSON.stringify(userData.body.refreshToken))
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
