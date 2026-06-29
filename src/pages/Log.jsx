import { useState, useEffect } from 'react'

export default function Log() {
  const [logs, setLogs] = useState([])
  const [acs, setAcs] = useState([])
  const [form, setForm] = useState({ date: '', ac: '', hours: '', temperature: '', notes: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setLogs(JSON.parse(localStorage.getItem('coolai_logs') || '[]'))
    setAcs(JSON.parse(localStorage.getItem('coolai_acs') || '[]'))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = (e) => {
    e.preventDefault()
    const updated = [...logs, { ...form, id: Date.now() }]
    setLogs(updated)
    localStorage.setItem('coolai_logs', JSON.stringify(updated))
    setForm({ date: '', ac: '', hours: '', temperature: '', notes: '' })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    const updated = logs.filter(log => log.id !== id)
    setLogs(updated)
    localStorage.setItem('coolai_logs', JSON.stringify(updated))
  }

  const inputClass = "border border-mist rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-cool-500/40 focus:border-cool-500 transition-all"

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fadeUp">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-1 drop-shadow-lg">Usage log</h1>
            <p className="text-white/90 font-medium drop-shadow-md">{logs.length} entr{logs.length !== 1 ? 'ies' : 'y'} logged</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-ink text-white px-5 py-2.5 rounded-xl font-medium hover:bg-cool-600 transition-all active:scale-95"
          >
            + Add log
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl shadow-sm border border-mist p-7 mb-6 animate-fadeUp">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Add usage log</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="date" value={form.date} onChange={handleChange} required className={inputClass} />
                <select name="ac" value={form.ac} onChange={handleChange} required className={inputClass}>
                  <option value="">Select AC</option>
                  {acs.map(ac => (
                    <option key={ac.id} value={`${ac.brand} ${ac.model}`}>{ac.brand} {ac.model} ({ac.room})</option>
                  ))}
                </select>
                <input type="number" name="hours" value={form.hours} onChange={handleChange} placeholder="Hours used" required className={inputClass} />
                <input type="number" name="temperature" value={form.temperature} onChange={handleChange} placeholder="Temperature (°C)" required className={inputClass} />
              </div>
              <input type="text" name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" className={`${inputClass} w-full`} />
              <button type="submit" className="w-full bg-ink text-white py-3 rounded-xl font-medium hover:bg-cool-600 transition-all">
                Save log
              </button>
            </form>
          </div>
        )}

        {logs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-mist p-16 text-center animate-fadeUp">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-ink/50">No logs yet — track your daily usage to unlock smarter tips.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log, i) => (
              <div
                key={log.id}
                style={{ animationDelay: `${i * 50}ms` }}
                className="bg-white rounded-2xl shadow-sm border border-mist p-5 flex justify-between items-center hover:border-cool-500/30 transition-all animate-fadeUp opacity-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cool-50 flex items-center justify-center text-lg font-nums text-cool-600">
                    {log.hours}h
                  </div>
                  <div>
                    <h2 className="font-medium text-ink">{log.date}</h2>
                    <p className="text-ink/50 text-sm">{log.ac} · {log.temperature}°C{log.notes ? ` · ${log.notes}` : ''}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-ink/30 hover:text-ember-500 transition-colors text-xs opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}