'use client'

import { BarChart3, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface ProgressTrackerProps {
  progress: number
  className?: string
}

export default function ProgressTracker({ progress, className = '' }: ProgressTrackerProps) {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getProgressStatus = (progress: number) => {
    if (progress >= 90) return { icon: CheckCircle, text: 'Hampir Selesai', color: 'text-green-600' }
    if (progress >= 60) return { icon: Clock, text: 'Dalam Proses', color: 'text-blue-600' }
    if (progress >= 30) return { icon: AlertCircle, text: 'Baru Dimulai', color: 'text-yellow-600' }
    return { icon: AlertCircle, text: 'Belum Dimulai', color: 'text-red-600' }
  }

  const status = getProgressStatus(progress)
  const StatusIcon = status.icon

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <BarChart3 className="h-5 w-5 text-gray-500" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${getProgressColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <StatusIcon className={`h-3 w-3 ${status.color}`} />
            <span className={`text-xs ${status.color}`}>{status.text}</span>
          </div>
        </div>
      </div>
    </div>
  )
}