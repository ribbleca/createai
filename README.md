# 🎓 Asisten Skripsi AI

**Asisten AI cerdas untuk membantu penyusunan skripsi dengan fitur outline otomatis, editor, dan chatbot AI.**

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fitur Utama

- 🚀 **Tanpa autentikasi** - Langsung pakai tanpa login
- 📝 **Input judul/topik skripsi** - Form sederhana dengan validasi
- 🤖 **Generate outline otomatis** - AI membuat outline BAB 1-5 otomatis
- ✏️ **Kustomisasi outline** - Edit, tambah, hapus, drag & drop reorder
- 📄 **Generate isi bab otomatis** - AI generate konten per bab
- 📝 **Editor isi bab** - Rich text editor dengan auto-save
- 💬 **Chatbox AI** - Diskusi dan tanya jawab dengan AI
- 💾 **Auto-save local storage** - Semua progress tersimpan otomatis
- 📤 **Export hasil** - Export ke .docx, .md, dan .json
- 📱 **UI minimalis & mobile-friendly** - Responsif untuk semua device

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Provider:** Groq AI (Llama 3.1 70B Versatile)
- **Rich Text Editor:** TipTap
- **Drag & Drop:** @dnd-kit
- **Export:** docx, file-saver
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📋 Requirements

- Node.js 18.17.0 atau lebih baru
- npm, yarn, atau pnpm
- Groq AI API Key

## 🚀 Quick Start

### 1. Clone Repository

\`\`\`bash
git clone <repository-url>
cd asisten-skripsi-ai
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# atau
yarn install
# atau
pnpm install
\`\`\`

### 3. Setup Environment Variables

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit file \`.env.local\` dan isi dengan API Key Anda:

\`\`\`env
GROQ_API_KEY=your_groq_api_key_here
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
\`\`\`

### 5. Test Groq AI Connection (Opsional)

\`\`\`bash
npm run test:groq
\`\`\`

Script ini akan:
- ✅ Memverifikasi API key setup
- ✅ Test koneksi ke Groq AI  
- ✅ Mencoba generate sample response
- ✅ Menampilkan troubleshooting jika ada error

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔑 Cara Mendapatkan Groq AI API Key

1. Buka [Groq Console](https://console.groq.com)
2. Sign up atau login dengan akun Anda
3. Pergi ke **API Keys** section
4. Klik "Create API Key"
5. Beri nama API key dan klik "Submit"
6. Copy API key dan paste ke \`.env.local\`

**⚠️ Penting:**
- Jangan commit API key ke repository
- API key memiliki rate limit (gratis: 30 requests/menit)
- Groq menyediakan free tier yang generous
- Untuk production scale, upgrade ke plan berbayar

**� Keunggulan Groq AI:**
- ⚡ **Lightning Fast** - Inference tercepat di dunia (500+ tokens/detik)
- 🧠 **Llama 3.1 70B** - Model terbaru dari Meta yang sangat powerful
- 💰 **Cost Effective** - Lebih murah dibanding OpenAI
- 🆓 **Generous Free Tier** - 30 requests/menit gratis
- 🎯 **High Quality** - Output berkualitas tinggi setara GPT-4
- 📖 **Large Context** - Support hingga 128K tokens

**🔧 Model Options di Groq:**

| Model | Use Case | Speed | Quality | Context |
|-------|----------|-------|---------|---------|
| `llama-3.1-70b-versatile` | **Production/Quality** | Fast | Excellent | 128K |
| `llama-3.1-8b-instant` | **Development/Speed** | Ultra Fast | Good | 128K |
| `mixtral-8x7b-32768` | **Alternative/Multilingual** | Fast | Very Good | 32K |
| `gemma2-9b-it` | **Lightweight** | Very Fast | Good | 8K |

**💡 Rekomendasi:**
- **Untuk Skripsi AI**: Gunakan `llama-3.1-70b-versatile` (default)
- **Untuk Testing**: Gunakan `llama-3.1-8b-instant` 
- **Untuk Bahasa Lain**: Gunakan `mixtral-8x7b-32768`

**⚡ Perbandingan Performance:**

| Provider | Speed (tokens/sec) | Free Tier | Cost (per 1M tokens) | Context |
|----------|-------------------|-----------|---------------------|---------|
| **Groq (Llama 3.1 70B)** | **500+** | **30 req/min** | **$0.59** | **128K** |
| OpenAI (GPT-4) | 50-100 | None | $30.00 | 128K |
| Anthropic (Claude 3.5) | 80-150 | None | $15.00 | 200K |
| Google (Gemini Pro) | 100-200 | 60 req/min | $1.25 | 32K |

**🏆 Mengapa Pilih Groq untuk Skripsi AI:**
- ✅ **10x lebih cepat** dari provider lain
- ✅ **Free tier paling generous** untuk development  
- ✅ **Cost effective** untuk production
- ✅ **Llama 3.1** model open-source terbaik
- ✅ **Perfect untuk bahasa Indonesia**

**🔥 Groq vs Kompetitor:**

| Aspek | Groq (Llama 3.1) | OpenAI (GPT-4) | Google (Gemini) | Anthropic (Claude) |
|-------|------------------|----------------|-----------------|-------------------|
| **Speed** | 🚀 500+ tok/sec | 🐌 50-100 tok/sec | 🏃 100-200 tok/sec | 🏃 80-150 tok/sec |
| **Free Tier** | ✅ 30 req/min | ❌ None | ⚠️ 60 req/min | ❌ None |
| **Cost** | 💰 $0.59/1M | 💸 $30/1M | 💵 $1.25/1M | 💸 $15/1M |
| **Setup** | ⚡ 2 menit | 🔧 5+ menit | 🔧 10+ menit | 🔧 10+ menit |
| **Indonesian** | 🇮🇩 Excellent | 🌍 Good | 🌍 Good | 🌍 Average |

## 📁 Struktur Project

\`\`\`
/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage dengan semua fitur
│   ├── globals.css         # Global styles
│   └── api/
│       └── ai/
│           └── route.ts    # API handler untuk AI
├── components/
│   ├── TitleInput.tsx      # Input judul skripsi
│   ├── OutlineEditor.tsx   # Editor outline dengan drag & drop
│   ├── BabEditor.tsx       # Rich text editor untuk bab
│   ├── Chatbox.tsx         # AI chatbot
│   ├── ExportButtons.tsx   # Export ke berbagai format
│   └── ProgressTracker.tsx # Progress indicator
├── utils/
│   ├── localStorage.ts     # Local storage management
│   ├── ai.ts              # AI service functions
│   └── exporter.ts        # Export utilities
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
├── .env.local.example
└── README.md
\`\`\`

## 🎯 Cara Menggunakan

### 1. Input Judul Skripsi
- Masukkan judul skripsi Anda
- Klik "Mulai Buat Skripsi"
- Atau pilih dari contoh judul yang tersedia

### 2. Generate & Edit Outline
- Klik "Generate dengan AI" untuk outline otomatis
- Edit, tambah, atau hapus bab sesuai kebutuhan
- Drag & drop untuk mengurutkan bab
- Setiap perubahan otomatis tersimpan

### 3. Tulis Konten Bab
- Pilih bab yang ingin ditulis
- Klik "Generate dengan AI" untuk konten otomatis
- Edit menggunakan rich text editor
- Gunakan toolbar untuk formatting
- Auto-save aktif secara real-time

### 4. Chat dengan AI
- Klik ikon chat di header
- Tanya tentang metodologi, referensi, atau saran
- AI memahami konteks skripsi Anda
- Riwayat chat tersimpan otomatis

### 5. Export Hasil
- Pilih tab "Export"
- Validasi kelengkapan skripsi
- Preview hasil sebelum export
- Download dalam format .docx, .md, atau .json

## 🔧 Konfigurasi Development

### Environment Variables

\`\`\`env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
NEXT_PUBLIC_APP_NAME=Asisten Skripsi AI
NEXT_PUBLIC_APP_VERSION=1.0.0
\`\`\`

### Scripts

\`\`\`bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint check
npm run test:groq # Test Groq AI connection
\`\`\`

### Customization

#### Mengubah Model AI
Edit \`app/api/ai/route.ts\`:

\`\`\`typescript
const completion = await groq.chat.completions.create({
  model: 'llama-3.1-70b-versatile', // Atau 'llama-3.1-8b-instant' untuk speed
  // Pilihan model lain: 'mixtral-8x7b-32768', 'gemma2-9b-it'
})
\`\`\`

#### Mengubah Tema
Edit \`tailwind.config.js\`:

\`\`\`javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Ubah warna primary sesuai selera
      }
    }
  }
}
\`\`\`

## 🚀 Deploy ke Vercel

### 1. Deploy via Dashboard

1. Push code ke GitHub
2. Buka [Vercel Dashboard](https://vercel.com)
3. Import project dari GitHub
4. Set environment variables di Settings
5. Deploy

### 2. Deploy via CLI

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 3. Environment Variables di Vercel

Tambahkan di Vercel Dashboard > Settings > Environment Variables:

\`\`\`
GROQ_API_KEY = your_groq_api_key_here
\`\`\`

### 4. Domain Custom (Opsional)

1. Beli domain
2. Tambahkan di Vercel Dashboard > Settings > Domains
3. Update DNS sesuai instruksi

## 🧪 Manual Testing Checklist

### ✅ Fitur Dasar
- [ ] Input judul skripsi baru
- [ ] Edit judul skripsi yang sudah ada
- [ ] Generate outline dengan AI
- [ ] Edit outline manual (tambah, hapus, edit)
- [ ] Drag & drop reorder outline
- [ ] Generate konten bab dengan AI
- [ ] Edit konten bab dengan rich text editor
- [ ] Auto-save functionality
- [ ] Chat dengan AI
- [ ] Export ke .docx
- [ ] Export ke .md
- [ ] Export ke .json
- [ ] Progress tracking

### ✅ UI/UX Testing
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Error handling
- [ ] Validation messages
- [ ] Navigation antar tab
- [ ] Accessibility (keyboard navigation)

### ✅ Data Persistence
- [ ] Data tersimpan setelah refresh
- [ ] Data tersimpan setelah close browser
- [ ] Reset project berfungsi
- [ ] Import/export data

### ✅ AI Integration
- [ ] API key validation
- [ ] Rate limit handling
- [ ] Error handling untuk API failures
- [ ] Response formatting

## 🐛 Troubleshooting

### Error: "API Key tidak ditemukan"

**Solusi:**
1. Pastikan file \`.env.local\` ada
2. Pastikan \`GROQ_API_KEY\` sudah diset
3. Restart development server
4. Cek apakah API key valid di Groq Console

### Error: "Rate limit exceeded"

**Solusi:**
1. Tunggu beberapa menit sebelum mencoba lagi (Groq Free: 30 requests/menit)
2. Upgrade ke Groq Pay-as-you-go plan jika perlu (14,400 requests/hari)
3. Gunakan delay antar request atau implement queue system

### Error: "Model overloaded" atau "Service unavailable"

**Solusi:**
1. Tunggu beberapa detik dan coba lagi (Groq kadang overloaded karena popularitas)
2. Implement retry logic dengan exponential backoff
3. Coba model alternatif seperti 'llama-3.1-8b-instant' yang lebih cepat

### Error: "Invalid model specified"

**Solusi:**
1. Pastikan menggunakan model yang tersedia: 'llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'
2. Cek dokumentasi Groq untuk model terbaru
3. Restart aplikasi setelah mengubah model

### Error: "Module not found"

**Solusi:**
1. Hapus \`node_modules\` dan \`package-lock.json\`
2. Run \`npm install\` ulang
3. Pastikan semua dependencies terinstall

### Error Build di Vercel

**Solusi:**
1. Pastikan Node.js version di \`package.json\`
2. Check environment variables di Vercel
3. Review build logs untuk error spesifik

### LocalStorage tidak bekerja

**Solusi:**
1. Pastikan JavaScript enabled
2. Check browser privacy settings
3. Gunakan incognito mode untuk testing

### Export tidak berfungsi

**Solusi:**
1. Pastikan browser supports file download
2. Check popup blocker settings
3. Disable ad blocker sementara

### Styling tidak muncul

**Solusi:**
1. Run \`npm run build\` untuk regenerate CSS
2. Clear browser cache
3. Check Tailwind config

## 📚 Dependencies

### Production Dependencies

\`\`\`json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@tiptap/react": "^2.1.13",
  "@tiptap/starter-kit": "^2.1.13",
  "docx": "^8.5.0",
  "file-saver": "^2.0.5",
  "lucide-react": "^0.294.0",
  "next": "14.0.4",
  "groq-sdk": "^0.7.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
\`\`\`

### Development Dependencies

\`\`\`json
{
  "@types/file-saver": "^2.0.7",
  "@types/node": "^20.10.5",
  "@types/react": "^18.2.45",
  "@types/react-dom": "^18.2.18",
  "autoprefixer": "^10.4.16",
  "dotenv": "^16.3.1",
  "eslint": "^8.56.0",
  "eslint-config-next": "14.0.4",
  "postcss": "^8.4.32",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.3.3"
}
\`\`\`

## 🤝 Contributing

1. Fork repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See \`LICENSE\` for more information.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Groq](https://groq.com/) - Lightning-fast AI inference
- [Meta Llama 3.1](https://llama.meta.com/) - Advanced language model
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TipTap](https://tiptap.dev/) - Rich text editor
- [Lucide](https://lucide.dev/) - Icon library
- [DND Kit](https://dndkit.com/) - Drag and drop

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:

1. Check documentation di README ini
2. Review troubleshooting section
3. Create issue di GitHub repository
4. Contact developer

---

**📝 Happy Writing! Semoga skripsi Anda sukses! 🎓**