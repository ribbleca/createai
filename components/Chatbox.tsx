'use client'

import { useState, useEffect, useRef } from 'react'
import { ProjectData } from '@/app/page'
import { chatWithAI } from '@/utils/ai'
import { handleAIError } from '@/utils/ai'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Trash2, 
  RefreshCw,
  Lightbulb,
  BookOpen,
  Search,
  Settings 
} from 'lucide-react'

interface ChatMessage {
  id: string
  message: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ChatboxProps {
  chatHistory: ChatMessage[]
  onUpdate: (chatHistory: ChatMessage[]) => void
  projectContext: ProjectData
}

export default function Chatbox({ chatHistory, onUpdate, projectContext }: ChatboxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMessages(chatHistory)
  }, [chatHistory])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      message: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputMessage('')
    setIsLoading(true)
    setError('')

    try {
      const aiResponse = await chatWithAI(inputMessage.trim(), projectContext)
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        message: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }

      const finalMessages = [...updatedMessages, aiMessage]
      setMessages(finalMessages)
      onUpdate(finalMessages)

    } catch (error) {
      const errorMessage = handleAIError(error)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
    onUpdate([])
  }

  const quickPrompts = [
    {
      icon: <Lightbulb className="h-4 w-4" />,
      text: "Berikan saran untuk memperbaiki bab ini",
      prompt: "Berikan saran untuk memperbaiki konten bab yang sedang saya tulis. Apa yang bisa ditingkatkan dari segi struktur, konten, atau penulisan?"
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      text: "Bantu mencari referensi",
      prompt: "Bantu saya mencari referensi yang relevan untuk topik skripsi saya. Saran jurnal atau buku apa yang bisa saya gunakan?"
    },
    {
      icon: <Search className="h-4 w-4" />,
      text: "Jelaskan metodologi penelitian",
      prompt: "Jelaskan metodologi penelitian yang cocok untuk topik skripsi saya. Apa saja langkah-langkah yang harus dilakukan?"
    },
    {
      icon: <Settings className="h-4 w-4" />,
      text: "Review outline skripsi",
      prompt: "Review outline skripsi saya. Apakah sudah lengkap dan logis? Ada yang perlu ditambahkan atau diperbaiki?"
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-5 w-5 text-primary-600" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        <button
          onClick={clearChat}
          className="text-gray-500 hover:text-red-600 transition-colors"
          title="Hapus semua chat"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Halo! Saya siap membantu Anda
            </h4>
            <p className="text-gray-600 text-sm mb-6">
              Tanya apa saja tentang skripsi Anda. Saya bisa membantu dengan outline, 
              konten, metodologi, atau pertanyaan lainnya.
            </p>
            
            {/* Quick Prompts */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-3">Pertanyaan cepat:</p>
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(prompt.prompt)}
                  className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  <div className="flex items-center space-x-2">
                    {prompt.icon}
                    <span>{prompt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.sender === 'ai' && (
                      <Bot className="h-4 w-4 mt-0.5 text-gray-600" />
                    )}
                    {msg.sender === 'user' && (
                      <User className="h-4 w-4 mt-0.5 text-white" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-gray-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-200">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan Anda..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {/* Project Context Info */}
        <div className="mt-3 text-xs text-gray-500">
          {projectContext.title && (
            <span>
              🎯 Konteks: {projectContext.title} • 
              {projectContext.outline.length} bab • 
              {projectContext.babContents.length} konten
            </span>
          )}
        </div>
      </div>
    </div>
  )
}