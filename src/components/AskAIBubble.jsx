import { Link, useLocation } from 'react-router-dom'

export default function AskAIBubble() {
  const location = useLocation()
  if (location.pathname === '/ask-ai') return null

  return (
    <Link
      to="/ask-ai"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-cool-500 animate-ping opacity-20" />
      <span className="relative flex flex-col items-center justify-center gap-0.5 w-20 h-20 rounded-full bg-white shadow-xl shadow-black/20 border border-mist transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-cool-500/30 group-hover:border-cool-400 active:scale-95">
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">❄️</span>
        <span className="font-display font-bold text-[11px] text-ink group-hover:text-cool-600 transition-colors duration-300 leading-none">
          Ask AI
        </span>
      </span>
    </Link>
  )
}