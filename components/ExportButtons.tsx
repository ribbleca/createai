'use client'

import { useState } from 'react'
import { ProjectData } from '@/app/page'
import { exportToDocx, exportToMarkdown, exportToJSON, validateProjectData, generateMarkdownPreview } from '@/utils/exporter'
import { 
  Download, 
  FileText, 
  File, 
  Database, 
  Eye, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw 
} from 'lucide-react'

interface ExportButtonsProps {
  projectData: ProjectData
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function ExportButtons({ projectData, isLoading, setIsLoading }: ExportButtonsProps) {
  const [exportingType, setExportingType] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null)

  const handleExportDocx = async () => {
    setExportingType('docx')
    setIsLoading(true)
    
    try {
      await exportToDocx(projectData)
    } catch (error) {
      console.error('Error exporting to DOCX:', error)
      alert('Gagal mengexport ke format DOCX. Silakan coba lagi.')
    } finally {
      setExportingType(null)
      setIsLoading(false)
    }
  }

  const handleExportMarkdown = () => {
    setExportingType('markdown')
    setIsLoading(true)
    
    try {
      exportToMarkdown(projectData)
    } catch (error) {
      console.error('Error exporting to Markdown:', error)
      alert('Gagal mengexport ke format Markdown. Silakan coba lagi.')
    } finally {
      setExportingType(null)
      setIsLoading(false)
    }
  }

  const handleExportJSON = () => {
    setExportingType('json')
    setIsLoading(true)
    
    try {
      exportToJSON(projectData)
    } catch (error) {
      console.error('Error exporting to JSON:', error)
      alert('Gagal mengexport ke format JSON. Silakan coba lagi.')
    } finally {
      setExportingType(null)
      setIsLoading(false)
    }
  }

  const handleValidate = () => {
    const result = validateProjectData(projectData)
    setValidationResult(result)
  }

  const exportOptions = [
    {
      type: 'docx',
      name: 'Word Document (.docx)',
      description: 'Format dokumen Word yang bisa diedit dan diformat lebih lanjut',
      icon: <FileText className="h-8 w-8" />,
      handler: handleExportDocx,
      color: 'bg-blue-500 hover:bg-blue-600',
      recommended: true
    },
    {
      type: 'markdown',
      name: 'Markdown (.md)',
      description: 'Format teks yang mudah dibaca dan dikonversi ke format lain',
      icon: <File className="h-8 w-8" />,
      handler: handleExportMarkdown,
      color: 'bg-green-500 hover:bg-green-600',
      recommended: false
    },
    {
      type: 'json',
      name: 'JSON Backup (.json)',
      description: 'File backup yang bisa diimpor kembali ke aplikasi',
      icon: <Database className="h-8 w-8" />,
      handler: handleExportJSON,
      color: 'bg-purple-500 hover:bg-purple-600',
      recommended: false
    }
  ]

  const getCompletionStats = () => {
    const totalBabs = projectData.outline.length
    const completedBabs = projectData.babContents.filter(content => 
      content.content.length > 100
    ).length
    const totalWords = projectData.babContents.reduce((sum, content) => 
      sum + Math.ceil(content.content.length / 5), 0
    )
    
    return { totalBabs, completedBabs, totalWords }
  }

  const stats = getCompletionStats()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Export Skripsi</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="btn-secondary flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Sembunyikan' : 'Preview'}
            </button>
            <button
              onClick={handleValidate}
              className="btn-secondary flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Validasi
            </button>
          </div>
        </div>
        
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Bab</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalBabs}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Bab Selesai</p>
                <p className="text-2xl font-bold text-green-900">{stats.completedBabs}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Total Kata</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalWords}</p>
              </div>
              <Database className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Validation Results */}
      {validationResult && (
        <div className={`mb-6 p-4 rounded-lg ${
          validationResult.valid 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {validationResult.valid ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <h3 className={`font-semibold ${
              validationResult.valid ? 'text-green-900' : 'text-red-900'
            }`}>
              {validationResult.valid ? 'Skripsi Siap untuk Export' : 'Ada Yang Perlu Diperbaiki'}
            </h3>
          </div>
          {!validationResult.valid && (
            <ul className="text-sm text-red-800 space-y-1">
              {validationResult.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Preview */}
      {previewMode && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Preview Skripsi</h3>
          <div className="bg-white rounded-lg p-4 text-sm">
            <pre className="whitespace-pre-wrap text-gray-700">
              {generateMarkdownPreview(projectData)}
            </pre>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exportOptions.map((option) => (
          <div key={option.type} className="relative">
            {option.recommended && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium z-10">
                Recommended
              </div>
            )}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-white ${option.color} mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {option.description}
                </p>
              </div>
              
              <button
                onClick={option.handler}
                disabled={isLoading}
                className={`w-full text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${option.color}`}
              >
                {exportingType === option.type ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export {option.type.toUpperCase()}
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Export Tips */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips Export:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Word Document:</strong> Terbaik untuk editing dan formatting lebih lanjut</li>
          <li>• <strong>Markdown:</strong> Mudah dibaca dan bisa dikonversi ke format lain</li>
          <li>• <strong>JSON Backup:</strong> Untuk backup data yang bisa diimpor kembali</li>
          <li>• Pastikan semua bab sudah terisi sebelum export final</li>
          <li>• Gunakan validasi untuk memastikan tidak ada yang terlewat</li>
        </ul>
      </div>

      {/* Last Modified Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Terakhir diupdate: {projectData.lastModified.toLocaleDateString('id-ID')} pukul {projectData.lastModified.toLocaleTimeString('id-ID')}
      </div>
    </div>
  )
}