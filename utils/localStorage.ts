// utils/localStorage.ts
import { ProjectData } from '@/app/page'

const STORAGE_KEY = 'asisten-skripsi-data'

export function saveToStorage(data: ProjectData): void {
  try {
    const serializedData = JSON.stringify({
      ...data,
      lastModified: data.lastModified.toISOString(),
      babContents: data.babContents.map(content => ({
        ...content,
        lastModified: content.lastModified.toISOString()
      }))
    })
    
    localStorage.setItem(STORAGE_KEY, serializedData)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function loadFromStorage(): ProjectData | null {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY)
    if (!serializedData) return null
    
    const data = JSON.parse(serializedData)
    
    return {
      ...data,
      lastModified: new Date(data.lastModified),
      babContents: data.babContents.map((content: any) => ({
        ...content,
        lastModified: new Date(content.lastModified)
      }))
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}

export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

export function getStorageSize(): number {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? data.length : 0
  } catch (error) {
    console.error('Error getting storage size:', error)
    return 0
  }
}

// Auto-save dengan debouncing
let saveTimeout: NodeJS.Timeout | null = null

export function debouncedSave(data: ProjectData, delay: number = 1000): void {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  
  saveTimeout = setTimeout(() => {
    saveToStorage(data)
  }, delay)
}

// Export/import functions
export function exportToJSON(data: ProjectData): string {
  return JSON.stringify(data, null, 2)
}

export function importFromJSON(jsonString: string): ProjectData | null {
  try {
    const data = JSON.parse(jsonString)
    return {
      ...data,
      lastModified: new Date(data.lastModified),
      babContents: data.babContents.map((content: any) => ({
        ...content,
        lastModified: new Date(content.lastModified)
      }))
    }
  } catch (error) {
    console.error('Error importing from JSON:', error)
    return null
  }
}

// Check if localStorage is available
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__localStorage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}