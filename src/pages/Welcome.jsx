import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Welcome() {
  const { user } = useAuth()

  const features = [
    { icon: '🏠', title: 'Assess your room', desc: 'Get the exact AC tonnage your space needs — no guesswork, no oversized bills.', to: '/assess' },
    { icon: '🤖', title: 'Ask AI', desc: 'Chat with CoolAI for instant, personalized cooling advice anytime.', to: '/ask-ai' },
    { icon: '💰', title: 'Track your bills', desc: 'Watch your electricity trend and catch waste before it costs you.', to: '/bill-tracker' },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="animate-fadeUp">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full mb-5">
            Welcome back
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Hi {user?.name?.split(' ')[0]}, let's keep things<br className="hidden sm:block" /> perfectly cool.
          </h1>
          <p className="text-white/90 text-lg max-w-xl mb-12 font-medium drop-shadow-md">
            Right-size your AC, cut your bills, and get answers the moment you need them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {features.map((f, i) => (
            <Link
              to={f.to}
              key={f.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className="group bg-white/95 backdrop-blur-md rounded-2xl p-7 border border-mist hover:border-cool-500/40 hover:shadow-xl hover:shadow-cool-500/5 transition-all duration-300 hover:-translate-y-1 animate-fadeUp opacity-0"
            >
              <div className="w-12 h-12 rounded-xl bg-cool-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h2 className="font-display text-lg font-semibold text-ink mb-2">{f.title}</h2>
              <p className="text-ink/50 text-sm leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/assess"
          className="inline-flex items-center gap-2 bg-ink text-white px-7 py-4 rounded-xl font-medium hover:bg-cool-600 transition-all duration-200 active:scale-[0.98] shadow-xl"
        >
          Start your room assessment
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}