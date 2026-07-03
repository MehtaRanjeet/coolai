 import { useState } from 'react'

const API = 'https://coolai-server.onrender.com'

export default function AdminPanel() {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [actionLoading, setActionLoading] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setLoggingIn(true)
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok || !data.token) {
        setLoginError(data.error || 'Invalid credentials')
      } else {
        setToken(data.token)
        await fetchUsers(data.token)
      }
    } catch {
      setLoginError('Could not reach server')
    }
    setLoggingIn(false)
  }

  const fetchUsers = async (authToken = token) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const data = await res.json()
      if (!res.ok) {
        // token expired/invalid — bounce back to login
        setToken(null)
        setLoginError(data.error || 'Session expired, please sign in again')
        setUsers([])
      } else {
        setUsers(Array.isArray(data) ? data : [])
      }
    } catch {
      alert('Failed to fetch users')
      setUsers([])
    }
    setLoading(false)
  }

  const handleGrant = async (email) => {
    setActionLoading(email)
    try {
      await fetch(`${API}/api/admin/grant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email })
      })
      await fetchUsers()
    } catch {
      alert('Action failed')
    }
    setActionLoading('')
  }

  const handleRevoke = async (email) => {
    setActionLoading(email)
    try {
      await fetch(`${API}/api/admin/revoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email })
      })
      await fetchUsers()
    } catch {
      alert('Action failed')
    }
    setActionLoading('')
  }

  const filtered = (users || []).filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const getStatus = (user) => {
    if (user.isAdmin) return { label: 'Admin', color: 'bg-purple-100 text-purple-700' }
    if (user.paid) return { label: 'Premium', color: 'bg-green-100 text-green-700' }
    return { label: 'Free', color: 'bg-gray-100 text-gray-600' }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mx-auto mb-3">
              ❄️
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CoolAI Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Sign in to manage users</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">❄️</div>
            <div>
              <h1 className="text-xl font-bold">CoolAI Admin Panel</h1>
              <p className="text-gray-400 text-xs">User Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <div className="bg-gray-800 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-gray-400 text-xs">Total Users</p>
              </div>
              <div className="bg-gray-800 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold text-green-400">{users.filter(u => u.paid || u.isAdmin).length}</p>
                <p className="text-gray-400 text-xs">Premium</p>
              </div>
              <div className="bg-gray-800 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold text-gray-300">{users.filter(u => !u.paid && !u.isAdmin).length}</p>
                <p className="text-gray-400 text-xs">Free</p>
              </div>
            </div>
            <button
              onClick={() => { setToken(null); setUsers([]) }}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-sm transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search + Refresh */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => fetchUsers()}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-5 py-3 rounded-xl text-sm transition-all"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading users...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No users found</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Visits</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Registered</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => {
                  const status = getStatus(user)
                  return (
                    <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{user.visits}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        {user.isAdmin ? (
                          <span className="text-purple-400 text-xs font-semibold">Admin — no action</span>
                        ) : actionLoading === user.email ? (
                          <span className="text-gray-400 text-xs">Loading...</span>
                        ) : user.paid ? (
                          <button
                            onClick={() => handleRevoke(user.email)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Revoke Access
                          </button>
                        ) : (
                          <button
                            onClick={() => handleGrant(user.email)}
                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Grant Access
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}