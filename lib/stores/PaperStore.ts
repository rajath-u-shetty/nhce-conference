import { create } from 'zustand'

type Paper = {
  title: string;
  url: string;
  id: string;
  status: string;
  updatedAt: string;
  authors: {
    name: string;
  }[],
  fileUrl?: string;
}

type PaperStore = {
  selectedPaper: Paper | null;
  setSelectedPaper: (paper: Paper | null) => void;
  approvePaper: (paperId: string) => void;
  rejectPaper: (paperId: string) => void;
}

export const usePaperStore = create<PaperStore>((set) => ({
  selectedPaper: null,
  papers: [],

  setSelectedPaper: (paper) => set({ selectedPaper: paper }),


  approvePaper: (paperId) => set((state) => ({
    selectedPaper: state.selectedPaper?.id === paperId 
      ? { ...state.selectedPaper, status: 'APPROVED' } 
      : state.selectedPaper
  })),

  rejectPaper: (paperId) => set((state) => ({
    selectedPaper: state.selectedPaper?.id === paperId ? null : state.selectedPaper
  })),

}))
