import { useState, useEffect } from 'react'
import { askAI } from '../api/gemini'

export default function Tips() {
  const [tips, setTips] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const assessment = JSON.parse(localStorage.getItem('coolai_assessment') || '{}')
    const logs = JSON.parse(localStorage.getItem('coolai_logs') || '[]')
    const acs = JSON.parse(localStorage.getItem('coolai_acs') || '[]')

    const context = `
      User has ${acs.length} AC unit(s).
      ${assessment.area ? `Room size: ${assessment.area} sq ft in ${assessment.city}.` : ''}
      ${assessment.tonnage ? `Recommended tonnage: ${assessment.tonnage} tons.` : ''}
      ${logs.length > 0 ? `Recent usage: ${logs.slice(-3).map(l => `${l.hours} hrs at ${l.temperature}°C`).join(', ')}.` : ''}
    `

    const messages = [{
      role: 'user',
      content: `Based on this user's AC usage data: ${context} Give 5 personalized energy saving tips to reduce electricity bills. Format each tip with a number and emoji.`
    }]

    setLoading(true)
    askAI(messages, 'You are CoolAI, an expert in air conditioning and energy efficiency in Indian homes.')
      .then(text => { setTips(text); setLoading(false) })
      .catch(() => setLoading(false))
  }, [refreshKey])

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto animate-fadeUp">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
          Personalized for you
        </span>
        <h1 className="font-display text-3xl font-bold text-white mb-2 drop-shadow-lg">Energy saving tips</h1>
        <p className="text-white/90 font-medium mb-8 drop-shadow-md">Based on your rooms, ACs, and usage history.</p>

        <div className="bg-white rounded-3xl shadow-sm border border-mist p-8 min-h-[280px]">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-mist animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-mist rounded-full w-full animate-pulse" />
                    <div className="h-3 bg-mist rounded-full w-2/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-ink/65 whitespace-pre-line leading-relaxed">{tips}</p>
          )}
        </div>

        <button
          onClick={() => setRefreshKey(k => k + 1)}
          disabled={loading}
          className="mt-4 w-full bg-ink text-white py-3.5 rounded-xl font-medium hover:bg-cool-600 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Regenerate tips'}
        </button>
      </div>
    </div>
  )
}