'use client'
import { MultiFileDropzone, type FileState } from '@/components/Dropzone'
import { useFileStore } from '@/lib/stores/FileUploadStore'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { useEdgeStore } from '@/lib/edgestore'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { AuthSession } from "@/lib/auth/utils"
import { Loader2, X } from 'lucide-react'

type Props = {
  error?: string
  required?: boolean
  session?: AuthSession["session"]
}

export function MultiFileDropzoneUsage({ error, required = true, session }: Props) {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const { 
    pdfUploaded, 
    setPdfUploaded, 
    pendingFile, 
    setPendingFile, 
    selectedFile, 
    setSelectedFile 
  } = useFileStore()
  const { edgestore } = useEdgeStore()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveFile = () => {
    // Find the file state that matches the pendingFile
    const fileState = fileStates.find(fs => fs.file === pendingFile)
    
    // If there's an ongoing upload, abort it
    if (fileState?.abortController) {
      fileState.abortController.abort()
    }

    // Reset all states
    setFileStates([])
    setPendingFile(null)
    setPdfUploaded(false)
    setSelectedFile(null)
    setIsLoading(false)
  }

  if (!session || !session.user) {
    router.push('/sign-in')
    return <div>Please login to upload a file</div>
  }

  const handleUpload = async () => {
    if (isLoading || pdfUploaded || !pendingFile || fileStates.length === 0) return

    setIsLoading(true)

    try {
      // Update the file state to show upload progress
      const updatedFileStates = fileStates.map(fileState => {
        if (fileState.file === pendingFile) {
          const abortController = new AbortController()
          return {
            ...fileState,
            progress: 0,
            abortController
          }
        }
        return fileState
      })
      setFileStates(updatedFileStates)

      const fileState = updatedFileStates.find(fs => fs.file === pendingFile)
      if (!fileState?.abortController) return

      const res = await edgestore.publicFiles.upload({
        file: pendingFile,
        signal: fileState.abortController.signal,
        onProgressChange: (progress) => {
          setFileStates(currentFileStates => 
            currentFileStates.map(fs => 
              fs.file === pendingFile ? { ...fs, progress } : fs
            )
          )
        },
      })

      // Update file state to show completion
      setFileStates(currentFileStates =>
        currentFileStates.map(fs =>
          fs.file === pendingFile ? { ...fs, progress: 'COMPLETE' } : fs
        )
      )

      setSelectedFile({
        fileUrl: res.url,
        fileSize: res.size,
        userId: session.user.id,
        uploadedBy: session.user.name || session.user.email!,
        uploadedAt: res.uploadedAt.toISOString(),
        name: pendingFile.name
      })

      toast({
        title: "Success",
        description: "Chapter paper uploaded successfully",
        variant: "default",
      })
      setPdfUploaded(true)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast({
          title: 'Cancelled uploading file',
          description: 'Failed to upload research paper. Please try again by uploading a valid PDF file.',
          variant: 'destructive',
        })
        // Update file state to show error
        setFileStates(currentFileStates =>
          currentFileStates.map(fs =>
            fs.file === pendingFile ? { ...fs, progress: 'ERROR' } : fs
          )
        )
      } else {
        // If the upload was aborted, we should clear all states
        handleRemoveFile()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2 text-sm text-gray-600">
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          // This handles both manual removal and drag-drop updates
          setFileStates(files)
          if (files.length === 0) {
            handleRemoveFile()
          }
        }}
        onFilesAdded={(addedFiles) => {
          if (addedFiles.length > 0) {
            // If there's already a file, remove it first
            if (fileStates.length > 0) {
              handleRemoveFile()
            }
            setPendingFile(addedFiles[0].file)
            setFileStates(addedFiles) // Replace existing files instead of adding
          }
        }}
        dropzoneOptions={{
          maxFiles: 1,
          accept: {
            'application/pdf': ['.pdf']
          }
        }}
      />
      <div className="flex justify-end">
        <Button 
          onClick={handleUpload} 
          disabled={pdfUploaded || isLoading || !pendingFile || fileStates.length === 0} 
          className='w-24'
        >
          {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : pdfUploaded ? 'Uploaded' : 'Upload'}
        </Button>
      </div>
    </div>
  )
}
