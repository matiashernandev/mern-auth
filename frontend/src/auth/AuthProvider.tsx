/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AccessTokenResponse, type AuthResponse } from "../types/types"
import { API_URL } from "./constants"

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => { },
  saveUser: (userData: AuthResponse) => { },
  getRefreshToken: () => { },
  signout: () => { },
  getUser: () => ({} as User | undefined)
})

interface IAuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState<string>("")
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch(`${API_URL}refresh-token`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })

      })
      if (response.ok) {
        const json = (await response.json()) as AccessTokenResponse

        if (json.error) {
          throw new Error(json.error)
        }

        return json
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}user`, {

        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }

      })
      if (response.ok) {
        const json = await response.json()

        if (json.error) {
          throw new Error(json.error)
        }

        return json.body
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function checkAuth() {
    if (accessToken) {
      const userInfo = await getUserInfo(accessToken)
      if (userInfo) {
        saveSessionInfo(userInfo, accessToken, getRefreshToken())
        setIsLoading(false)
      }
    } else {
      const token = getRefreshToken()
      if (token) {
        const newAccessToken = await requestNewAccessToken(token)

        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken)
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token)
            setIsLoading(false)
          }
        }
      }
    }
    setIsLoading(false)
  }

  function signout() {
    setIsAuthenticated(false)
    setAccessToken("")
    setUser(undefined)
    localStorage.removeItem("token")
  }

  function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
    setAccessToken(accessToken)
    localStorage.setItem("token", JSON.stringify(refreshToken))
    setIsAuthenticated(true)
    setUser(userInfo)
  }

  function getAccessToken() {
    return accessToken
  }

  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("token")
    if (tokenData) {
      const token = JSON.parse(tokenData)
      return token
    }
    return null
  }

  function saveUser(userData: AuthResponse) {
    saveSessionInfo(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken)
  }

  function getUser() {
    return user
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, signout }}>
      {isLoading ? <div>Loading....</div> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
