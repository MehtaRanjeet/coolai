import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { askAI } from '../api/gemini'

function Gauge({ value, max = 5 }) {
  const pct = Math.min(value / max, 1)
  const circumference = 2 * Math.PI * 80
  const offset = circumference * (1 - pct)

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#E2E8F0" strokeWidth="14" />
      <circle
        cx="100" cy="100" r="80" fill="none"
        stroke="#0EA5B7" strokeWidth="14" strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 100 100)"
        style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
      />
      <text x="100" y="95" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="38" fontWeight="600" fill="#ffffff">
        {value}
      </text>
      <text x="100" y="120" textAnchor="middle" fontSize="13" fill="#ffffff" opacity="0.6">
         TON
      </text>
     </svg>
  )
}

export default function Results() {
  const [result, setResult] = useState(null)
  const [aiTips, setAiTips] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('coolai_assessment'))
    setResult(data)
    if (data) {
      const messages = [{
        role: 'user',
        content: `My room is ${data.area} sq ft in ${data.city}, with ${data.windows} windows, ${data.sunExposure} sun exposure, ${data.occupants} occupants, ${data.ceilingHeight} ceiling, on ${data.floorType} floor. Recommended AC is ${data.tonnage} tons. Give me 3 short energy saving tips.`
      }]
      askAI(messages, 'You are CoolAI, an expert in air conditioning and energy efficiency. Give short, practical tips.')
        .then(text => { setAiTips(text); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [])

  if (!result) return (
    <div className="min-h-screen bg-frost flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-ink/50 mb-3">No assessment found yet.</p>
        <Link to="/assess" className="text-cool-600 font-medium hover:underline">Take the assessment →</Link>
      </div>
    </div>
  )

  const details = [
    { icon: '🏠', label: 'Area', value: `${result.area} sq ft` },
    { icon: '🪟', label: 'Windows', value: result.windows },
    { icon: '☀️', label: 'Sun exposure', value: result.sunExposure },
    { icon: '👥', label: 'Occupants', value: result.occupants },
    { icon: '📍', label: 'City', value: result.city },
    { icon: '🏢', label: 'Floor', value: result.floorType },
  ]

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">

        <div className="bg-ink rounded-3xl shadow-xl p-10 text-center animate-fadeUp relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cool-500/10 rounded-full blur-3xl" />
          <span className="relative inline-block text-xs font-semibold uppercase tracking-wider text-cool-400 bg-cool-500/10 px-3 py-1.5 rounded-full mb-6">
            Your recommendation
          </span>
          <div className="relative">
            <Gauge value={result.tonnage} />
          </div>
          <p className="relative text-white/60 mt-4 max-w-sm mx-auto">
            <span className="font-nums text-white">{result.btu.toLocaleString()} BTU</span> recommended for your {result.area} sq ft room in {result.city}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-mist p-8 animate-fadeUp">
          <h2 className="font-display text-lg font-semibold text-ink mb-5">Room details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {details.map(d => (
              <div key={d.label} className="bg-frost rounded-xl p-4">
                <div className="text-xl mb-1">{d.icon}</div>
                <div className="text-xs text-ink/40 uppercase tracking-wide mb-0.5">{d.label}</div>
                <div className="font-medium text-ink capitalize">{d.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-mist p-8 animate-fadeUp">
          <h2 className="font-display text-lg font-semibold text-ink mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-cool-50 flex items-center justify-center text-sm">🤖</span>
            AI energy tips
          </h2>
          {loading ? (
            <div className="space-y-2">
              <div className="h-3 bg-mist rounded-full w-full animate-pulse" />
              <div className="h-3 bg-mist rounded-full w-5/6 animate-pulse" />
              <div className="h-3 bg-mist rounded-full w-3/4 animate-pulse" />
            </div>
          ) : (
            <p className="text-ink/65 whitespace-pre-line leading-relaxed">
              {aiTips.replace(/\*\*(.*?)\*\*/g, '$1')}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Link to="/assess" className="flex-1 text-center bg-white border border-mist text-ink py-3.5 rounded-xl hover:border-ink/30 transition-all font-medium">
            Reassess
          </Link>
          <Link to="/my-acs" className="flex-1 text-center bg-ink text-white py-3.5 rounded-xl hover:bg-cool-600 transition-all font-medium">
            My ACs →
          </Link>
        </div>
      </div>
    </div>
  )
}