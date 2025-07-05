// utils/ai.ts
import { OutlineItem } from '@/app/page'

interface AIResponse {
  success: boolean
  data?: any
  error?: string
}

class AIService {
  private baseUrl = '/api/ai'

  async generateOutline(title: string): Promise<OutlineItem[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'generate_outline',
          data: { title }
        })
      })

      const result: AIResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate outline')
      }

      // Parse response menjadi format OutlineItem
      let outlineData = result.data

      // Jika response adalah string, coba parse sebagai JSON
      if (typeof outlineData === 'string') {
        try {
          outlineData = JSON.parse(outlineData)
        } catch (parseError) {
          // Jika gagal parse, buat outline default
          outlineData = this.createDefaultOutline()
        }
      }

      // Pastikan format sesuai dengan OutlineItem
      const outline: OutlineItem[] = outlineData.map((item: any, index: number) => ({
        id: `bab-${index + 1}`,
        title: item.title || `BAB ${index + 1}`,
        content: item.content || item.subbab?.join(', ') || 'Deskripsi bab',
        order: index + 1
      }))

      return outline

    } catch (error) {
      console.error('Error generating outline:', error)
      throw error
    }
  }

  async generateBabContent(title: string, outline: OutlineItem[], babTitle: string): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'generate_bab_content',
          data: { title, outline, babTitle }
        })
      })

      const result: AIResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate bab content')
      }

      return result.data || ''

    } catch (error) {
      console.error('Error generating bab content:', error)
      throw error
    }
  }

  async chat(message: string, context?: any): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'chat',
          data: { message, context }
        })
      })

      const result: AIResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to process chat')
      }

      return result.data || ''

    } catch (error) {
      console.error('Error in chat:', error)
      throw error
    }
  }

  async checkApiHealth(): Promise<{ isHealthy: boolean; hasApiKey: boolean }> {
    try {
      const response = await fetch(this.baseUrl)
      const result = await response.json()
      
      return {
        isHealthy: response.ok,
        hasApiKey: result.hasApiKey || false
      }
    } catch (error) {
      console.error('Error checking API health:', error)
      return { isHealthy: false, hasApiKey: false }
    }
  }

  private createDefaultOutline(): any[] {
    return [
      {
        title: 'BAB 1: PENDAHULUAN',
        content: 'Berisi latar belakang, rumusan masalah, tujuan penelitian, dan manfaat penelitian',
        subbab: [
          '1.1 Latar Belakang',
          '1.2 Rumusan Masalah',
          '1.3 Tujuan Penelitian',
          '1.4 Manfaat Penelitian',
          '1.5 Batasan Masalah'
        ]
      },
      {
        title: 'BAB 2: TINJAUAN PUSTAKA',
        content: 'Berisi landasan teori, penelitian terdahulu, dan kerangka konseptual',
        subbab: [
          '2.1 Landasan Teori',
          '2.2 Penelitian Terdahulu',
          '2.3 Kerangka Konseptual',
          '2.4 Hipotesis Penelitian'
        ]
      },
      {
        title: 'BAB 3: METODE PENELITIAN',
        content: 'Berisi jenis penelitian, populasi dan sampel, teknik pengumpulan data, dan analisis data',
        subbab: [
          '3.1 Jenis Penelitian',
          '3.2 Populasi dan Sampel',
          '3.3 Teknik Pengumpulan Data',
          '3.4 Instrumen Penelitian',
          '3.5 Analisis Data'
        ]
      },
      {
        title: 'BAB 4: HASIL DAN PEMBAHASAN',
        content: 'Berisi hasil penelitian, analisis data, dan pembahasan',
        subbab: [
          '4.1 Hasil Penelitian',
          '4.2 Analisis Data',
          '4.3 Pembahasan',
          '4.4 Temuan Penelitian'
        ]
      },
      {
        title: 'BAB 5: PENUTUP',
        content: 'Berisi kesimpulan, saran, dan keterbatasan penelitian',
        subbab: [
          '5.1 Kesimpulan',
          '5.2 Saran',
          '5.3 Keterbatasan Penelitian'
        ]
      }
    ]
  }
}

// Export singleton instance
export const aiService = new AIService()

// Export utility functions
export async function generateOutline(title: string): Promise<OutlineItem[]> {
  return aiService.generateOutline(title)
}

export async function generateBabContent(title: string, outline: OutlineItem[], babTitle: string): Promise<string> {
  return aiService.generateBabContent(title, outline, babTitle)
}

export async function chatWithAI(message: string, context?: any): Promise<string> {
  return aiService.chat(message, context)
}

export async function checkAIHealth(): Promise<{ isHealthy: boolean; hasApiKey: boolean }> {
  return aiService.checkApiHealth()
}

// Error handling utilities
export function handleAIError(error: any): string {
  if (error.message.includes('API key')) {
    return 'API Key tidak valid atau sudah expired. Silakan periksa konfigurasi API Key Anda.'
  }
  
  if (error.message.includes('rate limit')) {
    return 'Terlalu banyak permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.'
  }
  
  if (error.message.includes('quota')) {
    return 'Quota API sudah habis. Silakan upgrade plan OpenAI Anda.'
  }
  
  if (error.message.includes('network')) {
    return 'Koneksi internet bermasalah. Silakan periksa koneksi Anda.'
  }
  
  return 'Terjadi kesalahan saat berkomunikasi dengan AI. Silakan coba lagi.'
}