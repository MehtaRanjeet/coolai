import { useState, useEffect } from 'react'

export default function MyACs() {
  const [acs, setAcs] = useState([])
  const [form, setForm] = useState({ brand: '', model: '', tonnage: '', room: '', year: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('coolai_acs') || '[]')
    setAcs(saved)
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = (e) => {
    e.preventDefault()
    const updated = [...acs, { ...form, id: Date.now() }]
    setAcs(updated)
    localStorage.setItem('coolai_acs', JSON.stringify(updated))
    setForm({ brand: '', model: '', tonnage: '', room: '', year: '' })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    const updated = acs.filter(ac => ac.id !== id)
    setAcs(updated)
    localStorage.setItem('coolai_acs', JSON.stringify(updated))
  }

  const inputClass = "border border-mist rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-cool-500/40 focus:border-cool-500 transition-all"

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fadeUp">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-1 drop-shadow-lg">My ACs</h1>
            <p className="text-white/90 font-medium drop-shadow-md">{acs.length} unit{acs.length !== 1 ? 's' : ''} registered</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-ink text-white px-5 py-2.5 rounded-xl font-medium hover:bg-cool-600 transition-all active:scale-95"
          >
            + Add AC
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl shadow-sm border border-mist p-7 mb-6 animate-fadeUp">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Add new AC</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand (e.g. Daikin)" required className={inputClass} />
                <input name="model" value={form.model} onChange={handleChange} placeholder="Model" required className={inputClass} />
                <input name="tonnage" value={form.tonnage} onChange={handleChange} placeholder="Tonnage (e.g. 1.5)" required className={inputClass} />
                <input name="room" value={form.room} onChange={handleChange} placeholder="Room (e.g. Bedroom)" required className={inputClass} />
                <input name="year" value={form.year} onChange={handleChange} placeholder="Year purchased" required className={`${inputClass} col-span-2`} />
              </div>
              <button type="submit" className="w-full bg-ink text-white py-3 rounded-xl font-medium hover:bg-cool-600 transition-all">
                Save AC
              </button>
            </form>
          </div>
        )}

        {acs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-mist p-16 text-center animate-fadeUp">
            <div className="text-5xl mb-4">❄️</div>
            <p className="text-ink/50">No ACs added yet — register your first unit to start tracking it.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {acs.map((ac, i) => (
              <div
                key={ac.id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="bg-white rounded-2xl shadow-sm border border-mist p-6 hover:border-cool-500/40 hover:shadow-lg hover:shadow-cool-500/5 transition-all duration-300 animate-fadeUp opacity-0 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-11 h-11 rounded-xl bg-cool-50 flex items-center justify-center text-xl">❄️</div>
                  <button
                    onClick={() => handleDelete(ac.id)}
                    className="text-ink/30 hover:text-ember-500 transition-colors text-xs opacity-0 group-hover:opacity-100"
                  >
                    Remove
                  </button>
                </div>
                <h2 className="font-display font-semibold text-ink text-lg">{ac.brand} {ac.model}</h2>
                <p className="text-ink/50 text-sm mt-1">{ac.room} · <span className="font-nums">{ac.tonnage} ton</span> · {ac.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}