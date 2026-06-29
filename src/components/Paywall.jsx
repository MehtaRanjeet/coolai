export default function Paywall() {
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
          onClick={() => alert('Razorpay payment coming soon!')}
          className="w-full bg-ink text-white py-4 rounded-xl font-bold hover:bg-cool-600 transition-all active:scale-[0.98] mb-3"
        >
          Subscribe Now
        </button>

        <p className="text-xs text-ink/40">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  )
}