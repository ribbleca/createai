// test-groq.js
// Script sederhana untuk test Groq API connection
// Jalankan dengan: node test-groq.js

require('dotenv').config({ path: '.env.local' });

const Groq = require('groq-sdk').default;

async function testGroqConnection() {
  console.log('🧪 Testing Groq AI Connection...\n');
  
  // Check API Key
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GROQ_API_KEY tidak ditemukan di .env.local');
    console.log('📝 Pastikan file .env.local ada dan berisi:');
    console.log('   GROQ_API_KEY=your_groq_api_key_here\n');
    return;
  }
  
  console.log('✅ API Key ditemukan');
  console.log(`🔑 API Key: ${apiKey.substring(0, 20)}...${apiKey.substring(apiKey.length - 4)}\n`);
  
  // Initialize Groq
  const groq = new Groq({ apiKey });
  
  try {
    console.log('🚀 Testing dengan model llama-3.1-70b-versatile...');
    
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: 'Kamu adalah asisten AI yang membantu mahasiswa Indonesia.' },
        { role: 'user', content: 'Halo! Bisakah kamu membantu saya membuat outline skripsi tentang "Implementasi Machine Learning untuk Prediksi Harga Saham"?' }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    const response = completion.choices[0]?.message?.content || '';
    
    console.log('✅ Koneksi berhasil!');
    console.log('📊 Model: llama-3.1-70b-versatile');
    console.log('⚡ Response time: ~1-2 detik');
    console.log('\n📝 Sample Response:');
    console.log('---');
    console.log(response.substring(0, 200) + '...');
    console.log('---\n');
    
    console.log('🎉 Setup Groq AI berhasil!');
    console.log('👉 Sekarang jalankan: npm run dev');
    
  } catch (error) {
    console.error('❌ Error testing Groq:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('   1. Pastikan API key valid di https://console.groq.com');
      console.log('   2. Regenerate API key jika perlu');
      console.log('   3. Update .env.local dengan API key baru');
    } else if (error.message.includes('429')) {
      console.log('\n⏳ Rate limit exceeded:');
      console.log('   - Free tier: 30 requests/menit');
      console.log('   - Tunggu 1 menit dan coba lagi');
    } else {
      console.log('\n🔧 Cek koneksi internet dan coba lagi');
    }
  }
}

// Jalankan test
testGroqConnection();