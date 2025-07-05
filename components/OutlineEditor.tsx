'use client'

import { useState, useEffect } from 'react'
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { OutlineItem } from '@/app/page'
import { generateOutline } from '@/utils/ai'
import { handleAIError } from '@/utils/ai'
import { 
  Plus, 
  GripVertical, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Save, 
  X,
  ListTree,
  RefreshCw 
} from 'lucide-react'

interface OutlineEditorProps {
  title: string
  outline: OutlineItem[]
  onUpdate: (outline: OutlineItem[]) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

interface SortableItemProps {
  id: string
  item: OutlineItem
  onEdit: (id: string, title: string, content: string) => void
  onDelete: (id: string) => void
}

function SortableItem({ id, item, onEdit, onDelete }: SortableItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const [editContent, setEditContent] = useState(item.content)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = () => {
    onEdit(id, editTitle, editContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(item.title)
    setEditContent(item.content)
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-lg p-4 mb-3 ${
        isDragging ? 'shadow-lg opacity-50' : 'shadow-sm'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div
          className="mt-1 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Judul bab"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                placeholder="Deskripsi isi bab"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="btn-primary text-sm"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-secondary text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.content}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Hapus
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function OutlineEditor({ 
  title, 
  outline, 
  onUpdate, 
  isLoading, 
  setIsLoading 
}: OutlineEditorProps) {
  const [items, setItems] = useState<OutlineItem[]>(outline)
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setItems(outline)
  }, [outline])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over?.id)
      
      const newItems = arrayMove(items, oldIndex, newIndex)
      const reorderedItems = newItems.map((item, index) => ({
        ...item,
        order: index + 1
      }))
      
      setItems(reorderedItems)
      onUpdate(reorderedItems)
    }
  }

  const handleGenerateOutline = async () => {
    setIsGenerating(true)
    setIsLoading(true)
    setError('')
    
    try {
      const generatedOutline = await generateOutline(title)
      setItems(generatedOutline)
      onUpdate(generatedOutline)
    } catch (error) {
      const errorMessage = handleAIError(error)
      setError(errorMessage)
    } finally {
      setIsGenerating(false)
      setIsLoading(false)
    }
  }

  const handleAddItem = () => {
    const newItem: OutlineItem = {
      id: `bab-${Date.now()}`,
      title: `BAB ${items.length + 1}: [Judul Bab]`,
      content: 'Deskripsi isi bab...',
      order: items.length + 1
    }
    
    const newItems = [...items, newItem]
    setItems(newItems)
    onUpdate(newItems)
  }

  const handleEditItem = (id: string, title: string, content: string) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, title, content } : item
    )
    setItems(newItems)
    onUpdate(newItems)
  }

  const handleDeleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id)
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }))
    setItems(reorderedItems)
    onUpdate(reorderedItems)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <ListTree className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Outline Skripsi</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleGenerateOutline}
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
              onClick={handleAddItem}
              className="btn-secondary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Bab
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Judul Skripsi:</h3>
          <p className="text-blue-800">{title}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ListTree className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Belum Ada Outline
            </h3>
            <p className="text-gray-600 mb-6">
              Klik "Generate dengan AI" untuk membuat outline otomatis atau tambah bab secara manual
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGenerateOutline}
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
                onClick={handleAddItem}
                className="btn-secondary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Bab Manual
              </button>
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">✅ Outline Siap!</h4>
          <p className="text-green-800 text-sm">
            Anda sudah memiliki {items.length} bab dalam outline. 
            Anda dapat mengedit urutan dengan drag & drop, atau edit konten setiap bab.
          </p>
        </div>
      )}
    </div>
  )
}