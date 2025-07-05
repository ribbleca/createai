import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Asisten Skripsi AI',
  description: 'Asisten AI untuk membantu penyusunan skripsi dengan outline otomatis, editor, dan chatbot AI',
  keywords: 'skripsi, AI, asisten, outline, editor, chatbot',
  authors: [{ name: 'Asisten Skripsi AI' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}