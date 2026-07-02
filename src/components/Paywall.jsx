import { useState } from 'react'

export default function Paywall() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/background.png')",
          filter: 'blur(6px) brightness(0.85)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-ink/60" />

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 text-center animate-fadeUp">
        <div className="w-16 h-16 rounded-2xl bg-cool-50 flex items-center justify-center text-3xl mx-auto mb-5">
          ❄️
        </div>
        <h1 className="font-display text-2xl font-bold text-ink mb-2">
          You've used your 2 free visits
        </h1>
        <p className="text-ink/55 mb-8 leading-relaxed">
          You've enjoyed 2 free assessments with CoolAI. To continue using the app, please subscribe to our premium plan.
        </p>

        <div className="bg-frost rounded-2xl p-5 mb-7 text-left">
          <div className="font-display font-bold text-ink text-lg mb-3">What you get:</div>
          <ul className="space-y-2 text-ink/70 text-sm">
            <li>✅ Unlimited room assessments</li>
            <li>✅ AI-powered energy tips</li>
            <li>✅ Ask AI — unlimited questions</li>
            <li>✅ Bill tracking & trend analysis</li>
            <li>✅ AC inventory management</li>
            <li>✅ Technician directory access</li>
          </ul>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-ink text-white py-4 rounded-xl font-bold hover:bg-cool-600 transition-all active:scale-[0.98] mb-3"
        >
          Subscribe Now
        </button>

        <p className="text-xs text-ink/40">Lifetime access · Only &#8377;100</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-y-auto max-h-[90vh]">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-ink/40 hover:text-ink text-xl font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cool-50 flex items-center justify-center text-3xl mx-auto mb-3">
                🎉
              </div>
              <h2 className="font-display text-xl font-bold text-ink">How to Subscribe</h2>
              <p className="text-ink/50 text-sm mt-1">Simple, one-time lifetime access</p>
            </div>

            <div className="bg-cool-50 rounded-2xl p-4 text-center mb-5">
              <p className="text-ink/60 text-sm">One-time payment</p>
              <p className="font-display text-4xl font-bold text-cool-600">&#8377;100</p>
              <p className="text-cool-600 font-semibold text-sm mt-1">Lifetime Access</p>
            </div>

            <div className="bg-frost rounded-2xl p-4 mb-5 text-left">
              <p className="font-bold text-ink text-sm mb-2">What's included:</p>
              <ul className="space-y-1.5 text-ink/70 text-sm">
                <li>✅ Unlimited room assessments</li>
                <li>✅ AI-powered energy tips</li>
                <li>✅ Ask AI — unlimited questions</li>
                <li>✅ Bill tracking & trend analysis</li>
                <li>✅ AC inventory management</li>
                <li>✅ Technician directory access</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 text-left">
              <p className="font-bold text-ink text-sm mb-2">📞 How to Subscribe:</p>
              <p className="text-ink/70 text-sm leading-relaxed mb-2">
                Call or WhatsApp us to complete your payment of &#8377;100 and activate your account.
              </p>
              <a href="tel:+919818541009" className="inline-block bg-cool-500 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-cool-600 transition-all">
                📱 Call +91 98185 41009
              </a>
              <p className="text-ink/60 text-xs mt-3">
                ⏱ Access will be activated within <strong>7 working days</strong> of payment confirmation.
              </p>
            </div>

            <div className="border border-ink/10 rounded-2xl p-4 text-left">
              <p className="font-bold text-ink text-sm mb-1">📩 Number unreachable?</p>
              <p className="text-ink/60 text-sm leading-relaxed mb-3">
                Visit our main website and click "Get In Touch" on the home page to leave your query. We will contact you soon!
              </p>
              <a href="https://www.3rsandmconsultants.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-ink text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-cool-600 transition-all">
                🌐 Visit 3rsandmconsultants.com
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}