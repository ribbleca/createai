'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { OutlineItem, BabContent } from '@/app/page'
import { generateBabContent } from '@/utils/ai'
import { handleAIError } from '@/utils/ai'
import { 
  FileText, 
  Sparkles, 
  Save, 
  Eye, 
  EyeOff, 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  RefreshCw 
} from 'lucide-react'

interface BabEditorProps {
  outline: OutlineItem[]
  babContents: BabContent[]
  onUpdate: (babContent: BabContent) => void
  selectedBabId: string | null
  setSelectedBabId: (id: string | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function BabEditor({ 
  outline, 
  babContents, 
  onUpdate, 
  selectedBabId, 
  setSelectedBabId, 
  isLoading, 
  setIsLoading 
}: BabEditorProps) {
  const [currentContent, setCurrentContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  
  const selectedBab = outline.find(item => item.id === selectedBabId)
  const babContent = babContents.find(content => content.id === selectedBabId)

  const editor = useEditor({
    extensions: [StarterKit],
    content: babContent?.content || '',
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      setCurrentContent(content)
      handleAutoSave(content)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  useEffect(() => {
    if (editor && babContent) {
      editor.commands.setContent(babContent.content)
    }
  }, [editor, babContent])

  const handleAutoSave = (content: string) => {
    if (selectedBabId && content !== babContent?.content) {
      const updatedContent: BabContent = {
        id: selectedBabId,
        title: selectedBab?.title || '',
        content: content,
        aiGenerated: babContent?.aiGenerated || false,
        lastModified: new Date()
      }
      onUpdate(updatedContent)
    }
  }

  const handleGenerateContent = async () => {
    if (!selectedBab) return
    
    setIsGenerating(true)
    setIsLoading(true)
    setError('')
    
    try {
      const generatedContent = await generateBabContent(
        outline[0]?.title || 'Skripsi', 
        outline, 
        selectedBab.title
      )
      
      const newBabContent: BabContent = {
        id: selectedBabId || selectedBab.id,
        title: selectedBab.title,
        content: generatedContent,
        aiGenerated: true,
        lastModified: new Date()
      }
      
      onUpdate(newBabContent)
      editor?.commands.setContent(generatedContent)
      setCurrentContent(generatedContent)
      
    } catch (error) {
      const errorMessage = handleAIError(error)
      setError(errorMessage)
    } finally {
      setIsGenerating(false)
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    if (selectedBabId && currentContent) {
      const updatedContent: BabContent = {
        id: selectedBabId,
        title: selectedBab?.title || '',
        content: currentContent,
        aiGenerated: babContent?.aiGenerated || false,
        lastModified: new Date()
      }
      onUpdate(updatedContent)
    }
  }

  const formatToolbarButton = (action: () => void, icon: React.ReactNode, isActive?: boolean) => (
    <button
      onClick={action}
      className={`p-2 rounded-md transition-colors ${
        isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
    </button>
  )

  if (!selectedBab) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pilih Bab untuk Mulai Menulis
          </h3>
          <p className="text-gray-600 mb-6">
            Pilih salah satu bab dari outline untuk mulai menulis konten
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {outline.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedBabId(item.id)}
                className="p-4 border border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.content}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Editor Bab</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="btn-secondary flex items-center"
            >
              {isPreviewMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              )}
            </button>
            <button
              onClick={handleGenerateContent}
              disabled={isGenerating}
              className="btn-primary flex items-center"
            >
              {isGenerating ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate dengan AI
                </>
              )}
            </button>
            <button
              onClick={handleSave}
              className="btn-primary flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </button>
          </div>
        </div>
        
        {/* Bab Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">{selectedBab.title}</h3>
          <p className="text-blue-800 text-sm">{selectedBab.content}</p>
          {babContent && (
            <div className="mt-2 text-xs text-blue-700">
              Terakhir diupdate: {babContent.lastModified.toLocaleDateString('id-ID')}
              {babContent.aiGenerated && (
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                  AI Generated
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Bab Selector */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Pilih Bab:</h4>
        <div className="flex flex-wrap gap-2">
          {outline.map((item) => {
            const hasContent = babContents.some(content => 
              content.id === item.id && content.content.length > 100
            )
            return (
              <button
                key={item.id}
                onClick={() => setSelectedBabId(item.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedBabId === item.id
                    ? 'bg-primary-100 text-primary-700 border border-primary-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.title}
                {hasContent && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {!isPreviewMode && (
          <div className="border-b border-gray-200 p-3 flex items-center space-x-2">
            {formatToolbarButton(
              () => editor?.chain().focus().toggleBold().run(),
              <Bold className="h-4 w-4" />,
              editor?.isActive('bold')
            )}
            {formatToolbarButton(
              () => editor?.chain().focus().toggleItalic().run(),
              <Italic className="h-4 w-4" />,
              editor?.isActive('italic')
            )}
            {formatToolbarButton(
              () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
              <Heading1 className="h-4 w-4" />,
              editor?.isActive('heading', { level: 1 })
            )}
            {formatToolbarButton(
              () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
              <Heading2 className="h-4 w-4" />,
              editor?.isActive('heading', { level: 2 })
            )}
            {formatToolbarButton(
              () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
              <Heading3 className="h-4 w-4" />,
              editor?.isActive('heading', { level: 3 })
            )}
            {formatToolbarButton(
              () => editor?.chain().focus().toggleBulletList().run(),
              <List className="h-4 w-4" />,
              editor?.isActive('bulletList')
            )}
            {formatToolbarButton(
              () => editor?.chain().focus().toggleOrderedList().run(),
              <ListOrdered className="h-4 w-4" />,
              editor?.isActive('orderedList')
            )}
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            {formatToolbarButton(
              () => editor?.chain().focus().undo().run(),
              <Undo className="h-4 w-4" />
            )}
            {formatToolbarButton(
              () => editor?.chain().focus().redo().run(),
              <Redo className="h-4 w-4" />
            )}
          </div>
        )}
        
        <div className="p-6">
          {isPreviewMode ? (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: babContent?.content || '<p>Konten belum tersedia</p>' }}
            />
          ) : (
            <EditorContent 
              editor={editor} 
              className="min-h-[400px] focus:outline-none"
            />
          )}
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <div>
          {babContent ? (
            <span>
              {babContent.content.length} karakter • 
              {Math.ceil(babContent.content.length / 5)} kata (estimasi)
            </span>
          ) : (
            <span>Belum ada konten</span>
          )}
        </div>
        <div>
          Auto-save aktif
        </div>
      </div>
    </div>
  )
}