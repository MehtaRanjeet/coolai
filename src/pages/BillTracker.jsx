import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function BillTracker() {
  const [bills, setBills] = useState([])
  const [form, setForm] = useState({ month: '', year: '', amount: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setBills(JSON.parse(localStorage.getItem('coolai_bills') || '[]'))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = (e) => {
    e.preventDefault()
    const updated = [...bills, { ...form, id: Date.now() }]
    updated.sort((a, b) => new Date(`${a.month} ${a.year}`) - new Date(`${b.month} ${b.year}`))
    setBills(updated)
    localStorage.setItem('coolai_bills', JSON.stringify(updated))
    setForm({ month: '', year: '', amount: '' })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    const updated = bills.filter(b => b.id !== id)
    setBills(updated)
    localStorage.setItem('coolai_bills', JSON.stringify(updated))
  }

  const chartData = bills.map(b => ({ name: `${b.month.slice(0, 3)} ${b.year}`, amount: Number(b.amount) }))
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const inputClass = "border border-mist rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-cool-500/40 focus:border-cool-500 transition-all"

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fadeUp">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-1 drop-shadow-lg">Bill tracker</h1>
            <p className="text-white/90 font-medium drop-shadow-md">{bills.length} bill{bills.length !== 1 ? 's' : ''} recorded</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-ink text-white px-5 py-2.5 rounded-xl font-medium hover:bg-cool-600 transition-all active:scale-95"
          >
            + Add bill
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl shadow-sm border border-mist p-7 mb-6 animate-fadeUp">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Add monthly bill</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <select name="month" value={form.month} onChange={handleChange} required className={inputClass}>
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input type="number" name="year" value={form.year} onChange={handleChange} placeholder="Year" required className={inputClass} />
                <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount (₹)" required className={inputClass} />
              </div>
              <button type="submit" className="w-full bg-ink text-white py-3 rounded-xl font-medium hover:bg-cool-600 transition-all">
                Save bill
              </button>
            </form>
          </div>
        )}

        {bills.length > 1 && (
          <div className="bg-white rounded-3xl shadow-sm border border-mist p-7 mb-6 animate-fadeUp">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Bill trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#0F1B2D99' }} />
                <YAxis tick={{ fontSize: 12, fill: '#0F1B2D99' }} />
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0' }} />
                <Line type="monotone" dataKey="amount" stroke="#0EA5B7" strokeWidth={3} dot={{ fill: '#0EA5B7', r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {bills.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-mist p-16 text-center animate-fadeUp">
            <div className="text-5xl mb-4">💰</div>
            <p className="text-ink/50">No bills yet — add your first one to start tracking trends.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bills.map((bill, i) => (
              <div
                key={bill.id}
                style={{ animationDelay: `${i * 50}ms` }}
                className="bg-white rounded-2xl shadow-sm border border-mist p-5 flex justify-between items-center hover:border-cool-500/30 transition-all animate-fadeUp opacity-0 group"
              >
                <div>
                  <h2 className="font-medium text-ink">{bill.month} {bill.year}</h2>
                  <p className="font-nums text-cool-600 text-lg mt-0.5">₹{Number(bill.amount).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(bill.id)}
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