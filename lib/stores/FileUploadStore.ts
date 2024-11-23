import { create } from 'zustand'
import { FileUploadRequest } from '@/lib/validators/formValidator'

interface PaperState {
  selectedFile: FileUploadRequest | null
  pendingFile: File | null
  setPendingFile: (file: File | null) => void
  setSelectedFile: (paper: FileUploadRequest | null) => void
  reset: () => void
  pdfUploaded: boolean
  setPdfUploaded: (status: boolean) => void
}

export const useFileStore = create<PaperState>((set) => ({
  selectedFile: null,
  pendingFile: null,
  setPendingFile: (file) => set({ pendingFile: file }),
  setSelectedFile: (paper) => set({ selectedFile: paper }),
  reset: () => set({ selectedFile: null, pendingFile: null }),
  pdfUploaded: false,
  setPdfUploaded: (status) => set({ pdfUploaded: status }),
}))

