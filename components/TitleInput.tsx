'use client'

import { useState } from 'react'
import { PenTool, Sparkles, BookOpen } from 'lucide-react'

interface TitleInputProps {
  initialTitle?: string
  onSubmit: (title: string) => void
  isLoading?: boolean
}

export default function TitleInput({ initialTitle = '', onSubmit, isLoading = false }: TitleInputProps) {
  const [title, setTitle] = useState(initialTitle)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Judul skripsi tidak boleh kosong')
      return
    }
    
    if (title.trim().length < 5) {
      setError('Judul skripsi minimal 5 karakter')
      return
    }
    
    setError('')
    onSubmit(title.trim())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (error) setError('')
  }

  const sampleTitles = [
    'Implementasi Machine Learning untuk Prediksi Harga Saham',
    'Analisis Sentimen Media Sosial terhadap Brand Awareness',
    'Pengembangan Aplikasi Mobile untuk Pembelajaran Online',
    'Sistem Informasi Manajemen Persediaan Berbasis Web',
    'Penerapan Blockchain dalam Sistem Voting Elektronik'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Asisten Skripsi AI</h1>
        </div>
        <p className="text-lg text-gray-600">
          Mulai perjalanan skripsi Anda dengan bantuan AI yang cerdas
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-6">
          <PenTool className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Masukkan Judul Skripsi Anda
          </h2>
          <p className="text-gray-600">
            Tuliskan judul skripsi yang akan Anda kerjakan. AI akan membantu membuat outline yang sesuai.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Skripsi
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleChange}
              placeholder="Contoh: Implementasi Machine Learning untuk Prediksi Harga Saham"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Memproses...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Mulai Buat Skripsi
              </>
            )}
          </button>
        </form>

        {/* Sample Titles */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            💡 Contoh Judul Skripsi:
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {sampleTitles.map((sampleTitle, index) => (
              <button
                key={index}
                onClick={() => setTitle(sampleTitle)}
                className="text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-700"
                disabled={isLoading}
              >
                {sampleTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Tips Membuat Judul Skripsi:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Spesifik dan jelas menggambarkan topik penelitian</li>
            <li>• Menggunakan kata kunci yang relevan dengan bidang studi</li>
            <li>• Tidak terlalu panjang (maksimal 15-20 kata)</li>
            <li>• Menunjukkan metode atau pendekatan yang akan digunakan</li>
          </ul>
        </div>
      </div>
    </div>
  )
}