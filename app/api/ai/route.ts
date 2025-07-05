import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key tidak ditemukan. Pastikan OPENAI_API_KEY sudah diset di environment variables.' },
        { status: 500 }
      )
    }

    let systemPrompt = ''
    let userPrompt = ''

    switch (type) {
      case 'generate_outline':
        systemPrompt = `Kamu adalah asisten AI yang membantu mahasiswa menulis skripsi. 
        Tugasmu adalah membuat outline skripsi yang terstruktur dan lengkap berdasarkan judul yang diberikan.
        
        Buatlah outline skripsi dengan 5 BAB yang standar:
        - BAB 1: PENDAHULUAN (berisi latar belakang, rumusan masalah, tujuan penelitian, manfaat penelitian)
        - BAB 2: TINJAUAN PUSTAKA (berisi landasan teori, penelitian terdahulu, kerangka konseptual)
        - BAB 3: METODE PENELITIAN (berisi jenis penelitian, populasi dan sampel, teknik pengumpulan data, analisis data)
        - BAB 4: HASIL DAN PEMBAHASAN (berisi hasil penelitian, analisis data, pembahasan)
        - BAB 5: PENUTUP (berisi kesimpulan, saran, keterbatasan penelitian)
        
        Untuk setiap BAB, buatlah sub-bab yang sesuai dengan judul skripsi.
        Format response dalam JSON dengan struktur:
        [
          {
            "title": "BAB 1: PENDAHULUAN",
            "content": "Deskripsi singkat isi bab dan sub-bab yang akan dibahas",
            "subbab": ["1.1 Latar Belakang", "1.2 Rumusan Masalah", "dst..."]
          }
        ]`
        
        userPrompt = `Buatlah outline skripsi untuk judul: "${data.title}"`
        break

      case 'generate_bab_content':
        systemPrompt = `Kamu adalah asisten AI yang membantu mahasiswa menulis konten skripsi.
        Tugasmu adalah membuat konten lengkap untuk bab yang diminta berdasarkan outline yang sudah ada.
        
        Buatlah konten yang:
        - Akademis dan formal
        - Relevan dengan judul skripsi
        - Terstruktur dengan baik
        - Menggunakan bahasa Indonesia yang baik dan benar
        - Panjang minimal 500 kata
        - Sesuai dengan standar penulisan skripsi
        
        Sertakan referensi contoh (bisa fiktif untuk template) jika diperlukan.`
        
        userPrompt = `Judul Skripsi: "${data.title}"
        
        Outline keseluruhan:
        ${data.outline.map((item: any) => `${item.title}: ${item.content}`).join('\n')}
        
        Buatlah konten lengkap untuk: ${data.babTitle}
        
        Konten harus detailed dan siap pakai untuk skripsi.`
        break

      case 'chat':
        systemPrompt = `Kamu adalah asisten AI yang membantu mahasiswa dalam penulisan skripsi.
        Kamu bisa membantu dengan:
        - Memberikan saran perbaikan konten
        - Menjawab pertanyaan tentang metodologi penelitian
        - Membantu mencari referensi dan sumber
        - Memberikan feedback tentang struktur dan alur penulisan
        - Membantu mengatasi writer's block
        
        Selalu berikan jawaban yang konstruktif, akademis, dan membantu.
        Gunakan bahasa Indonesia yang baik dan formal namun tetap ramah.`
        
        userPrompt = data.message
        break

      default:
        return NextResponse.json(
          { error: 'Tipe request tidak valid' },
          { status: 400 }
        )
    }

    // Panggil OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: type === 'generate_outline' ? 1000 : 2000,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || ''

    // Untuk generate_outline, parse JSON response
    if (type === 'generate_outline') {
      try {
        const parsedOutline = JSON.parse(response)
        return NextResponse.json({ success: true, data: parsedOutline })
      } catch (parseError) {
        // Jika gagal parse JSON, return sebagai text
        return NextResponse.json({ success: true, data: response })
      }
    }

    return NextResponse.json({ success: true, data: response })

  } catch (error) {
    console.error('Error in AI API:', error)
    
    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API Key tidak valid atau sudah expired' },
          { status: 401 }
        )
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Silakan tunggu beberapa saat.' },
          { status: 429 }
        )
      }
      
      if (error.message.includes('insufficient_quota')) {
        return NextResponse.json(
          { error: 'Quota API sudah habis. Silakan upgrade plan OpenAI Anda.' },
          { status: 402 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Terjadi kesalahan saat berkomunikasi dengan AI. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}

// Handle GET request untuk health check
export async function GET() {
  return NextResponse.json({ 
    message: 'AI API is running',
    hasApiKey: !!process.env.OPENAI_API_KEY 
  })
}