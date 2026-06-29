import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const links = [
    { to: '/assess', label: 'Assess' },
    { to: '/my-acs', label: 'My ACs' },
    { to: '/log', label: 'Log' },
    { to: '/tips', label: 'Tips' },
    { to: '/bill-tracker', label: 'Bills' },
    { to: '/technician', label: 'Technician' },
  ]

  return (
    <nav className="bg-white text-ink px-6 py-4 sticky top-0 z-50 shadow-md border-b border-mist">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink">
          <span className="w-8 h-8 rounded-full bg-cool-50 flex items-center justify-center text-cool-600 animate-wave">
            ❄
          </span>
          CoolAI
        </Link>

        <div className="hidden md:flex gap-1 text-sm font-medium">
          {links.map(link => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-cool-50 text-cool-600'
                    : 'text-ink/60 hover:text-ink hover:bg-frost'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/profile" className="hidden sm:flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors">
            <span className="w-7 h-7 rounded-full bg-cool-50 flex items-center justify-center text-xs font-semibold text-cool-600">
              {user?.name?.[0]?.toUpperCase()}
            </span>
            {user?.name?.split(' ')[0]}
          </Link>
          <button
            onClick={handleLogout}
            className="bg-frost hover:bg-ember-500 hover:text-white text-ink px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}