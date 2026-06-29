export default function Technician() {
  const technicians = [
    { name: 'Rajesh Kumar', phone: '+91 98765 43210', area: 'South Delhi', rating: 4.8, experience: '10 years', speciality: 'Split AC, Window AC' },
    { name: 'Suresh Sharma', phone: '+91 98765 12345', area: 'North Delhi', rating: 4.6, experience: '7 years', speciality: 'Inverter AC, Central AC' },
    { name: 'Amit Singh', phone: '+91 99876 54321', area: 'West Delhi', rating: 4.9, experience: '12 years', speciality: 'All AC types' },
    { name: 'Vikram Patel', phone: '+91 97654 32109', area: 'East Delhi', rating: 4.5, experience: '5 years', speciality: 'Split AC, Cassette AC' },
    { name: 'Mohan Das', phone: '+91 96543 21098', area: 'Gurgaon', rating: 4.7, experience: '8 years', speciality: 'Inverter AC, VRF systems' },
    { name: 'Ravi Verma', phone: '+91 95432 10987', area: 'Noida', rating: 4.6, experience: '6 years', speciality: 'Split AC, Window AC' },
  ]

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fadeUp">
          <h1 className="font-display text-3xl font-bold text-white mb-1 drop-shadow-lg">Find a technician</h1>
          <p className="text-white/90 font-medium drop-shadow-md">Certified AC professionals near you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicians.map((tech, i) => (
            <div
              key={tech.name}
              style={{ animationDelay: `${i * 60}ms` }}
              className="bg-white rounded-2xl shadow-sm border border-mist p-6 hover:border-cool-500/40 hover:shadow-lg hover:shadow-cool-500/5 transition-all duration-300 animate-fadeUp opacity-0"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-ink flex items-center justify-center text-white font-display font-semibold">
                    {tech.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-ink">{tech.name}</h2>
                    <p className="text-ink/45 text-xs">{tech.area}</p>
                  </div>
                </div>
                <span className="bg-cool-50 text-cool-700 px-2.5 py-1 rounded-lg text-xs font-nums font-semibold">
                  ★ {tech.rating}
                </span>
              </div>
              <p className="text-ink/55 text-sm mb-1">🔧 {tech.speciality}</p>
              <p className="text-ink/55 text-sm mb-5">💼 {tech.experience} experience</p>
              
                <a href={`tel:${tech.phone}`}
                className="block w-full text-center bg-ink text-white py-2.5 rounded-xl hover:bg-cool-600 transition-all text-sm font-medium font-nums"
              >
                {tech.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}