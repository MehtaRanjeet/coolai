import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, login } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    const updatedUser = { ...user, name, email }
    const users = JSON.parse(localStorage.getItem('coolai_users') || '[]')
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u)
    localStorage.setItem('coolai_users', JSON.stringify(updatedUsers))
    login(updatedUser)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputClass = "w-full border border-mist rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cool-500/40 focus:border-cool-500 transition-all"

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-md mx-auto animate-fadeUp">
        <h1 className="font-display text-3xl font-bold text-white mb-8 drop-shadow-lg">My profile</h1>
        <div className="bg-white rounded-3xl shadow-sm border border-mist p-8">
          <div className="text-center mb-7">
            <div className="w-20 h-20 bg-ink rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-display font-semibold text-white">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <p className="text-ink/45 text-sm">{user?.email}</p>
          </div>

          {saved && (
            <div className="bg-cool-50 text-cool-700 px-4 py-3 rounded-xl mb-5 text-sm text-center border border-cool-500/20 animate-fadeUp">
              Profile updated successfully
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wide mb-1.5">Full name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wide mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required />
            </div>
            <button type="submit" className="w-full bg-ink text-white py-3.5 rounded-xl font-medium hover:bg-cool-600 transition-all active:scale-[0.98]">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}