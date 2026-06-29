import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('coolai_user')
    return saved ? JSON.parse(saved) : null
  })

  const [usage, setUsage] = useState({ visits: 0, paid: false })

  const login = async (userData) => {
    localStorage.setItem('coolai_user', JSON.stringify(userData))
    setUser(userData)

    // Record visit and get usage
    const res = await fetch('http://https://coolai-server.onrender.com/api/usage/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userData.email })
    })
    const data = await res.json()
    setUsage(data)
    return data
  }

  const checkUsage = async (email) => {
    const res = await fetch(`http://https://coolai-server.onrender.com/api/usage/${email}`)
    const data = await res.json()
    setUsage(data)
    return data
  }

  const logout = () => {
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