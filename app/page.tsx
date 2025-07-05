'use client'

import { useState, useEffect } from 'react'
import TitleInput from '@/components/TitleInput'
import OutlineEditor from '@/components/OutlineEditor'
import BabEditor from '@/components/BabEditor'
import Chatbox from '@/components/Chatbox'
import ExportButtons from '@/components/ExportButtons'
import ProgressTracker from '@/components/ProgressTracker'
import { loadFromStorage, saveToStorage } from '@/utils/localStorage'
import { BookOpen, MessageCircle, Download, BarChart3 } from 'lucide-react'

export interface OutlineItem {
  id: string
  title: string
  content: string
  order: number
}

export interface BabContent {
  id: string
  title: string
  content: string
  aiGenerated: boolean
  lastModified: Date
}

export interface ProjectData {
  title: string
  outline: OutlineItem[]
  babContents: BabContent[]
  chatHistory: any[]
  lastModified: Date
}

export default function HomePage() {
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    outline: [],
    babContents: [],
    chatHistory: [],
    lastModified: new Date()
  })
  
  const [currentView, setCurrentView] = useState<'title' | 'outline' | 'bab' | 'export'>('title')
  const [selectedBabId, setSelectedBabId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)

  // Load data dari localStorage saat component mount
  useEffect(() => {
    const savedData = loadFromStorage()
    if (savedData) {
      setProjectData(savedData)
      if (savedData.title) {
        setCurrentView(savedData.outline.length > 0 ? 'outline' : 'outline')
      }
    }
  }, [])

  // Auto-save setiap kali projectData berubah
  useEffect(() => {
    if (projectData.title || projectData.outline.length > 0) {
      saveToStorage(projectData)
    }
  }, [projectData])

  const updateProjectData = (updates: Partial<ProjectData>) => {
    setProjectData(prev => ({
      ...prev,
      ...updates,
      lastModified: new Date()
    }))
  }

  const handleTitleSubmit = (title: string) => {
    updateProjectData({ title })
    setCurrentView('outline')
  }

  const handleOutlineUpdate = (outline: OutlineItem[]) => {
    updateProjectData({ outline })
  }

  const handleBabContentUpdate = (babContent: BabContent) => {
    const updatedContents = projectData.babContents.filter(content => content.id !== babContent.id)
    updatedContents.push(babContent)
    updateProjectData({ babContents: updatedContents })
  }

  const handleChatUpdate = (chatHistory: any[]) => {
    updateProjectData({ chatHistory })
  }

  const resetProject = () => {
    setProjectData({
      title: '',
      outline: [],
      babContents: [],
      chatHistory: [],
      lastModified: new Date()
    })
    setCurrentView('title')
    setSelectedBabId(null)
    localStorage.removeItem('asisten-skripsi-data')
  }

  const getProgress = () => {
    const totalSteps = projectData.outline.length + 1 // +1 for title
    const completedSteps = (projectData.title ? 1 : 0) + 
                          projectData.babContents.filter(content => content.content.length > 100).length
    return Math.round((completedSteps / totalSteps) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Asisten Skripsi AI</h1>
                {projectData.title && (
                  <p className="text-sm text-gray-600 truncate max-w-xs">
                    {projectData.title}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ProgressTracker progress={getProgress()} />
              
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2 rounded-lg transition-colors ${
                  showChat ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              
              {projectData.title && (
                <button
                  onClick={() => setCurrentView('export')}
                  className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                >
                  <Download className="h-5 w-5" />
                </button>
              )}
              
              {projectData.title && (
                <button
                  onClick={resetProject}
                  className="btn-secondary text-sm"
                >
                  Reset Project
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            {projectData.title && (
              <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setCurrentView('title')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'title' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Judul
                </button>
                <button
                  onClick={() => setCurrentView('outline')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'outline' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Outline
                </button>
                <button
                  onClick={() => setCurrentView('bab')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'bab' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Isi Bab
                </button>
                <button
                  onClick={() => setCurrentView('export')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'export' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Export
                </button>
              </div>
            )}

            {/* Content Area */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {currentView === 'title' && (
                <div className="p-6">
                  <TitleInput
                    initialTitle={projectData.title}
                    onSubmit={handleTitleSubmit}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {currentView === 'outline' && projectData.title && (
                <div className="p-6">
                  <OutlineEditor
                    title={projectData.title}
                    outline={projectData.outline}
                    onUpdate={handleOutlineUpdate}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              )}

              {currentView === 'bab' && projectData.outline.length > 0 && (
                <div className="p-6">
                  <BabEditor
                    outline={projectData.outline}
                    babContents={projectData.babContents}
                    onUpdate={handleBabContentUpdate}
                    selectedBabId={selectedBabId}
                    setSelectedBabId={setSelectedBabId}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              )}

              {currentView === 'export' && projectData.title && (
                <div className="p-6">
                  <ExportButtons
                    projectData={projectData}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="lg:col-span-1">
              <Chatbox
                chatHistory={projectData.chatHistory}
                onUpdate={handleChatUpdate}
                projectContext={projectData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}