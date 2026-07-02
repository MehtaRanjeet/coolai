import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import bgImage from '../assets/background.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://coolai-server.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Invalid email or password')
        return
      }
      await login(data.user)
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(8px) brightness(0.85)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-ink/50" />

      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-black/40 w-full max-w-md p-10 animate-fadeUp">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-10 h-10 rounded-full bg-cool-50 flex items-center justify-center text-cool-500 text-xl">❄</span>
          <h1 className="font-display text-2xl font-semibold text-ink">CoolAI</h1>
        </div>
        <p className="text-ink/50 mb-8">Sign in to keep your home perfectly cool.</p>

        {error && (
          <div className="bg-ember-50 text-ember-600 text-sm px-4 py-3 rounded-xl mb-5 border border-ember-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wide mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-mist rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cool-500/40 focus:border-cool-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wide mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-mist rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cool-500/40 focus:border-cool-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-ink text-white py-3.5 rounded-xl font-medium hover:bg-cool-600 transition-all duration-200 active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/50">
          New to CoolAI?{' '}
          <Link to="/register" className="text-cool-600 font-medium hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  )
}