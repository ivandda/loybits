import AIChatbot from '@/components/AI/AIChatbot'

export default function AIPage() {
  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <h1 className="animate-fade-up bg-gradient-to-br from-white to-stone-400 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
        AI Chatbot
      </h1>
      <p className="mt-4 animate-fade-up text-center text-gray-200 opacity-0 md:text-lg" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
        Welcome to the Loybits AI assistant! Feel free to ask anything about Loybits, our loyalty program, or how we can help your business.
      </p>
      <div className="mt-8">
        <AIChatbot />
      </div>
    </div>
  )
}