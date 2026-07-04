import { createContext, useContext, useState } from 'react'
import { saveToken, clearToken, apiFetch } from '../api/client'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('coolai_user')
    return saved ? JSON.parse(saved) : null
  })

  const [usage, setUsage] = useState({ visits: 0, paid: false })

  const login = async (userData, token) => {
    if (token) saveToken(token)
    localStorage.setItem('coolai_user', JSON.stringify(userData))
    setUser(userData)

    // Record visit and get usage
    const res = await apiFetch('/api/usage/visit', {
      method: 'POST',
      body: JSON.stringify({ email: userData.email })
    })
    const data = await res.json()
    setUsage(data)
    return data
  }

  const checkUsage = async (email) => {
    const res = await apiFetch(`/api/usage/${email}`)
    const data = await res.json()
    setUsage(data)
    return data
  }

  const logout = () => {
    clearToken()
    localStorage.removeItem('coolai_user')
    setUser(null)
    setUsage({ visits: 0, paid: false })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, usage, checkUsage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)