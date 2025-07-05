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
- **AI Provider:** OpenAI GPT-3.5 Turbo
- **Rich Text Editor:** TipTap
- **Drag & Drop:** @dnd-kit
- **Export:** docx, file-saver
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📋 Requirements

- Node.js 18.17.0 atau lebih baru
- npm, yarn, atau pnpm
- OpenAI API Key

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
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
\`\`\`

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔑 Cara Mendapatkan OpenAI API Key

1. Buka [OpenAI Platform](https://platform.openai.com)
2. Buat akun atau login
3. Pergi ke [API Keys](https://platform.openai.com/api-keys)
4. Klik "Create new secret key"
5. Copy API key dan paste ke \`.env.local\`

**⚠️ Penting:**
- Jangan commit API key ke repository
- API key memiliki rate limit dan billing
- Pastikan akun OpenAI memiliki credit/billing setup

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
OPENAI_API_KEY=your_openai_api_key_here

# Optional
NEXT_PUBLIC_APP_NAME=Asisten Skripsi AI
NEXT_PUBLIC_APP_VERSION=1.0.0
\`\`\`

### Scripts

\`\`\`bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
\`\`\`

### Customization

#### Mengubah Model AI
Edit \`app/api/ai/route.ts\`:

\`\`\`typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4', // Ganti ke gpt-4 jika tersedia
  // ...
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
OPENAI_API_KEY = your_openai_api_key_here
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
2. Pastikan \`OPENAI_API_KEY\` sudah diset
3. Restart development server
4. Cek apakah API key valid di OpenAI Dashboard

### Error: "Rate limit exceeded"

**Solusi:**
1. Tunggu beberapa menit sebelum mencoba lagi
2. Upgrade plan OpenAI jika perlu
3. Gunakan delay antar request

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
  "openai": "^4.20.1",
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
- [OpenAI](https://openai.com/) - AI API
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