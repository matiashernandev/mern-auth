import { createContext, useContext, useState } from "react"

const AuthContext = createContext({
  isAuthenticated: false
})

interface IAuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [isAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
