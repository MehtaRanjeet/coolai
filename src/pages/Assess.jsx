import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Assess() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    area: '',
    ceilingHeight: 'normal',
    windows: '',
    sunExposure: 'medium',
    occupants: '',
    city: '',
    floorType: 'middle',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Base: 25 BTU per sq ft
    let btu = form.area * 25

    // Sun exposure adjustment
    if (form.sunExposure === 'high') btu *= 1.15
    if (form.sunExposure === 'low') btu *= 0.85

    // Ceiling height adjustment
    if (form.ceilingHeight === 'high') btu *= 1.1

    // Floor type adjustment
    if (form.floorType === 'top') btu *= 1.15
    if (form.floorType === 'ground') btu *= 0.95

    // Occupants heat load
    btu += form.occupants * 600

    // Window heat load
    btu += form.windows * 1000

    // City/climate zone adjustment
    const hotCities = [
  // North India - Hot & Dry
  'delhi', 'new delhi', 'jaipur', 'jodhpur', 'bikaner', 'ajmer', 'kota',
  'udaipur', 'alwar', 'bharatpur', 'sikar', 'pali', 'barmer', 'jaisalmer',
  'lucknow', 'agra', 'kanpur', 'varanasi', 'allahabad', 'prayagraj',
  'meerut', 'aligarh', 'mathura', 'bareilly', 'moradabad', 'gorakhpur',
  'ghaziabad', 'noida', 'faridabad', 'gurugram', 'gurgaon',
  // Central India
  'nagpur', 'bhopal', 'indore', 'jabalpur', 'gwalior', 'ujjain', 'ratlam',
  'sagar', 'raipur', 'bilaspur', 'bhilai', 'korba',
  // West India
  'ahmedabad', 'surat', 'vadodara', 'rajkot', 'bhavnagar', 'jamnagar',
  'gandhinagar', 'anand', 'mehsana', 'nadiad',
  // Telangana & AP
  'hyderabad', 'secunderabad', 'warangal', 'nizamabad', 'karimnagar',
  'vijayawada', 'guntur', 'tirupati', 'nellore', 'kurnool', 'rajahmundry',
  // Bihar & Jharkhand
  'patna', 'gaya', 'muzaffarpur', 'bhagalpur', 'darbhanga',
  'ranchi', 'jamshedpur', 'dhanbad', 'bokaro',
  // Haryana & Punjab (summers)
  'chandigarh', 'ludhiana', 'amritsar', 'jalandhar', 'patiala', 'ambala',
  'hisar', 'rohtak', 'panipat', 'karnal', 'sonipat',
]

const coolCities = [
  // Karnataka
  'bangalore', 'bengaluru', 'mysore', 'mysuru', 'mangalore', 'mangaluru',
  'hubli', 'dharwad', 'shimoga', 'shivamogga', 'tumkur', 'hassan',
  'coorg', 'kodagu', 'chikmagalur', 'udupi',
  // Maharashtra (highlands)
  'pune', 'nashik', 'aurangabad', 'kolhapur', 'sangli', 'satara', 'solapur',
  'mahabaleshwar', 'lonavala', 'khandala',
  // Himachal Pradesh
  'shimla', 'manali', 'dharamsala', 'kullu', 'mandi', 'solan', 'palampur',
  'dalhousie', 'kasauli', 'chail',
  // Uttarakhand
  'dehradun', 'mussoorie', 'nainital', 'haridwar', 'rishikesh',
  'almora', 'ranikhet', 'auli', 'lansdowne',
  // Jammu & Kashmir
  'srinagar', 'jammu', 'leh', 'kargil', 'gulmarg', 'pahalgam',
  // Northeast
  'shillong', 'gangtok', 'darjeeling', 'itanagar', 'kohima', 'aizawl',
  'imphal', 'agartala',
  // Tamil Nadu (highlands)
  'ooty', 'udhagamandalam', 'kodaikanal', 'yercaud', 'coonoor',
  // Kerala (highlands)
  'munnar', 'wayanad', 'idukki',
]

const humidCities = [
  // Maharashtra coast
  'mumbai', 'thane', 'navi mumbai', 'pune', 'ratnagiri', 'alibag',
  // Tamil Nadu
  'chennai', 'coimbatore', 'madurai', 'tiruchirappalli', 'trichy',
  'salem', 'tirunelveli', 'vellore', 'thanjavur', 'tanjore',
  'pondicherry', 'puducherry', 'cuddalore', 'nagapattinam',
  // Kerala
  'kochi', 'cochin', 'thiruvananthapuram', 'trivandrum', 'kozhikode',
  'calicut', 'thrissur', 'kollam', 'kannur', 'palakkad',
  // West Bengal & Odisha
  'kolkata', 'calcutta', 'howrah', 'durgapur', 'asansol', 'siliguri',
  'bhubaneswar', 'cuttack', 'puri', 'rourkela', 'berhampur',
  // Goa
  'goa', 'panaji', 'panjim', 'margao', 'vasco', 'mapusa',
  // Andhra coast
  'visakhapatnam', 'vizag', 'kakinada', 'machilipatnam',
  // Assam & Northeast plains
  'guwahati', 'dibrugarh', 'silchar', 'jorhat', 'tezpur',
  // Andaman
  'port blair',
]
    const cityLower = form.city.toLowerCase().trim()

    if (hotCities.some(c => cityLower.includes(c))) btu *= 1.15
    else if (humidCities.some(c => cityLower.includes(c))) btu *= 1.10
    else if (coolCities.some(c => cityLower.includes(c))) btu *= 0.90

    // Convert to tonnage (1 ton = 12,000 BTU)
    const tonnage = (btu / 12000).toFixed(1)
    const result = { ...form, btu: Math.round(btu), tonnage }
    localStorage.setItem('coolai_assessment', JSON.stringify(result))
    navigate('/results')
  }

  const inputClass = "w-full border border-mist rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-cool-500/40 focus:border-cool-500 transition-all"
  const labelClass = "block text-xs font-semibold text-ink/60 uppercase tracking-wide mb-1.5"

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto animate-fadeUp">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
          Step 1 of 2
        </span>
        <h1 className="font-display text-4xl font-bold text-white mb-2 drop-shadow-lg">Room assessment</h1>
        <p className="text-white/90 font-medium mb-8 drop-shadow-md">A few details about your space, and we'll calculate the exact AC capacity you need.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-mist p-8 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Room area (sq ft)</label>
              <input type="number" name="area" value={form.area} onChange={handleChange}
                placeholder="150" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input type="text" name="city" value={form.city} onChange={handleChange}
                placeholder="Delhi" className={inputClass} required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Ceiling height</label>
              <select name="ceilingHeight" value={form.ceilingHeight} onChange={handleChange} className={inputClass}>
                <option value="normal">Normal (up to 10 ft)</option>
                <option value="high">High (above 10 ft)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Floor type</label>
              <select name="floorType" value={form.floorType} onChange={handleChange} className={inputClass}>
                <option value="top">Top floor</option>
                <option value="middle">Middle floor</option>
                <option value="ground">Ground floor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Number of windows</label>
              <input type="number" name="windows" value={form.windows} onChange={handleChange}
                placeholder="2" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Occupants</label>
              <input type="number" name="occupants" value={form.occupants} onChange={handleChange}
                placeholder="2" className={inputClass} required />
            </div>
          </div>

          <div>
            <label className={labelClass}>Sun exposure</label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map(level => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setForm({ ...form, sunExposure: level })}
                  className={`py-3 rounded-xl text-sm font-medium capitalize border transition-all ${
                    form.sunExposure === level
                      ? 'bg-ember-50 border-ember-500 text-ember-600'
                      : 'border-mist text-ink/50 hover:border-ink/20'
                  }`}
                >
                  {level === 'low' ? '☁️ Low' : level === 'medium' ? '⛅ Medium' : '☀️ High'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ink text-white py-4 rounded-xl font-medium hover:bg-cool-600 transition-all duration-200 active:scale-[0.98] mt-2"
          >
            Calculate my AC size →
          </button>
        </form>
      </div>
    </div>
  )
}