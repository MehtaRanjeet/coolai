import bgImage from '../assets/background.png'
import AskAIBubble from './AskAIBubble'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(6px) brightness(0.9)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-frost/10" />
      <div className="relative z-0">
        {children}
      </div>
      <AskAIBubble />
    </div>
  )
}