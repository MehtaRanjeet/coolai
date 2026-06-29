import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { askAI } from '../api/gemini'
import bgImage from '../assets/background.png'

export default function AskAI() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const systemPrompt = 'You are CoolAI, an expert in air conditioning, energy efficiency, and home cooling in India. Help users optimize their AC usage, understand their bills, choose the right AC, and save electricity. Keep responses concise and practical.'

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async (text) => {
    const content = text ?? input
    if (!content.trim()) return
    const userMessage = { role: 'user', content }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    try {
      const reply = await askAI(updatedMessages, systemPrompt)
      setMessages([...updatedMessages, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestions = [
    { icon: '🌡️', text: 'Ideal AC temperature to save electricity?' },
    { icon: '🔧', text: 'How often should I service my AC?' },
    { icon: '❄️', text: 'Best AC brand for Indian summers?' },
  ]

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col">

      {/* blurred background photo, same as rest of app */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(6px) brightness(0.85)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-ink/55" />

      {/* header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            ←
          </button>
          <div className="flex items-center gap-2.5">
            <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
              <span className="absolute inset-0 rounded-full bg-cool-300/40 animate-ping" />
              <span className="relative text-lg">❄️</span>
            </span>
            <div>
              <h1 className="font-display text-base font-bold text-white leading-tight drop-shadow">CoolAI</h1>
              <p className="text-white/80 text-[11px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cool-300 inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-3">

          {messages.length === 0 && (
            <div className="flex flex-col items-center text-center pt-10 pb-4">
              <div className="w-16 h-16 rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-3xl shadow-xl mb-5">
                🤖
              </div>
              <h2 className="text-white font-display font-bold text-xl mb-1.5 drop-shadow">Hi, I'm CoolAI</h2>
              <p className="text-white/85 font-medium mb-6 max-w-xs drop-shadow">
                Ask me anything about your AC, bills, or how to cool smarter.
              </p>
              <div className="flex flex-col gap-2 w-full max-w-md">
                {suggestions.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => handleSend(s.text)}
                    className="w-full flex items-center gap-3 text-left bg-white hover:bg-cool-50 text-ink font-medium rounded-2xl px-4 py-3.5 text-sm transition-all duration-200 shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="text-lg">{s.icon}</span>
                    {s.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium shadow-lg ${
                msg.role === 'user'
                  ? 'bg-cool-500 text-white rounded-br-md'
                  : 'bg-white text-ink rounded-bl-md'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3.5 rounded-2xl rounded-bl-md flex gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 bg-cool-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-cool-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-cool-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* input bar */}
      <div className="px-4 sm:px-6 py-4 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your AC..."
            className="flex-1 border border-white/30 rounded-2xl px-4 py-3.5 bg-white/95 text-ink font-medium placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-cool-400 focus:bg-white transition-all duration-200"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-cool-500 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-cool-600 transition-all duration-200 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}