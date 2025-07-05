// utils/exporter.ts
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import { ProjectData } from '@/app/page'

// Export ke format .docx
export async function exportToDocx(projectData: ProjectData): Promise<void> {
  try {
    // Buat document baru
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Judul utama
            new Paragraph({
              children: [
                new TextRun({
                  text: projectData.title,
                  bold: true,
                  size: 28,
                }),
              ],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),

            // Spacing
            new Paragraph({
              children: [new TextRun({ text: "" })],
            }),

            // Daftar Isi
            new Paragraph({
              children: [
                new TextRun({
                  text: "DAFTAR ISI",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),

            // Generate daftar isi dari outline
            ...projectData.outline.map(item => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: item.title,
                    size: 20,
                  }),
                ],
                spacing: {
                  after: 120,
                },
              })
            ),

            // Spacing
            new Paragraph({
              children: [new TextRun({ text: "" })],
            }),

            // Konten setiap bab
            ...generateBabContent(projectData),
          ],
        },
      ],
    })

    // Generate dan download file
    const buffer = await Packer.toBuffer(doc)
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    })
    
    const fileName = `${projectData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_skripsi.docx`
    saveAs(blob, fileName)

  } catch (error) {
    console.error('Error exporting to DOCX:', error)
    throw new Error('Gagal mengexport ke format DOCX')
  }
}

// Export ke format .md
export function exportToMarkdown(projectData: ProjectData): void {
  try {
    let markdown = `# ${projectData.title}\n\n`
    
    // Metadata
    markdown += `*Terakhir diupdate: ${projectData.lastModified.toLocaleDateString('id-ID')}*\n\n`
    
    // Daftar Isi
    markdown += `## Daftar Isi\n\n`
    projectData.outline.forEach((item, index) => {
      markdown += `${index + 1}. [${item.title}](#${item.title.toLowerCase().replace(/[^a-z0-9]/gi, '-')})\n`
    })
    markdown += '\n'
    
    // Konten setiap bab
    projectData.outline.forEach(outlineItem => {
      markdown += `## ${outlineItem.title}\n\n`
      markdown += `*${outlineItem.content}*\n\n`
      
      // Cari konten bab yang sesuai
      const babContent = projectData.babContents.find(content => 
        content.title === outlineItem.title || content.id === outlineItem.id
      )
      
      if (babContent && babContent.content) {
        markdown += `${babContent.content}\n\n`
      } else {
        markdown += `*Konten bab belum tersedia*\n\n`
      }
      
      markdown += '---\n\n'
    })
    
    // Download file
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const fileName = `${projectData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_skripsi.md`
    saveAs(blob, fileName)

  } catch (error) {
    console.error('Error exporting to Markdown:', error)
    throw new Error('Gagal mengexport ke format Markdown')
  }
}

// Export ke format JSON (backup)
export function exportToJSON(projectData: ProjectData): void {
  try {
    const jsonData = JSON.stringify(projectData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const fileName = `${projectData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_backup.json`
    saveAs(blob, fileName)

  } catch (error) {
    console.error('Error exporting to JSON:', error)
    throw new Error('Gagal mengexport ke format JSON')
  }
}

// Helper function untuk generate konten bab dalam DOCX
function generateBabContent(projectData: ProjectData): Paragraph[] {
  const paragraphs: Paragraph[] = []
  
  projectData.outline.forEach(outlineItem => {
    // Judul bab
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: outlineItem.title,
            bold: true,
            size: 24,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 480,
          after: 240,
        },
      })
    )
    
    // Deskripsi bab
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: outlineItem.content,
            italics: true,
            size: 20,
          }),
        ],
        spacing: {
          after: 240,
        },
      })
    )
    
    // Konten bab
    const babContent = projectData.babContents.find(content => 
      content.title === outlineItem.title || content.id === outlineItem.id
    )
    
    if (babContent && babContent.content) {
      // Split konten menjadi paragraf-paragraf
      const contentParagraphs = babContent.content.split('\n\n')
      
      contentParagraphs.forEach(paragraph => {
        if (paragraph.trim()) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: paragraph.trim(),
                  size: 20,
                }),
              ],
              spacing: {
                after: 200,
              },
            })
          )
        }
      })
    } else {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '[Konten bab belum tersedia]',
              italics: true,
              size: 20,
            }),
          ],
          spacing: {
            after: 240,
          },
        })
      )
    }
    
    // Page break untuk bab baru
    paragraphs.push(
      new Paragraph({
        children: [new TextRun({ text: "" })],
        pageBreakBefore: true,
      })
    )
  })
  
  return paragraphs
}

// Helper function untuk format filename
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '')
}

// Preview functions
export function generateMarkdownPreview(projectData: ProjectData): string {
  let preview = `# ${projectData.title}\n\n`
  
  preview += `**Status:** ${getProjectStatus(projectData)}\n`
  preview += `**Terakhir diupdate:** ${projectData.lastModified.toLocaleDateString('id-ID')}\n\n`
  
  preview += `## Ringkasan Outline\n\n`
  projectData.outline.forEach((item, index) => {
    const hasContent = projectData.babContents.some(content => 
      content.title === item.title && content.content.length > 100
    )
    const status = hasContent ? '✅' : '⏳'
    preview += `${index + 1}. ${status} ${item.title}\n`
  })
  
  return preview
}

function getProjectStatus(projectData: ProjectData): string {
  const totalBabs = projectData.outline.length
  const completedBabs = projectData.babContents.filter(content => 
    content.content.length > 100
  ).length
  
  const percentage = Math.round((completedBabs / totalBabs) * 100)
  
  if (percentage === 100) return 'Selesai'
  if (percentage >= 75) return 'Hampir Selesai'
  if (percentage >= 50) return 'Dalam Proses'
  if (percentage >= 25) return 'Baru Dimulai'
  return 'Belum Dimulai'
}

// Validation functions
export function validateProjectData(projectData: ProjectData): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!projectData.title || projectData.title.trim().length < 5) {
    errors.push('Judul skripsi terlalu pendek (minimal 5 karakter)')
  }
  
  if (projectData.outline.length === 0) {
    errors.push('Outline belum dibuat')
  }
  
  if (projectData.babContents.length === 0) {
    errors.push('Belum ada konten bab yang dibuat')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}