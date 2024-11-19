import { create } from 'zustand'
import { PaperStatus } from '@prisma/client'
import { persist, createJSONStorage } from 'zustand/middleware';


type PaperStatusRequest = PaperStatus | 'ALL'

interface PaperStatusState {
  selectedPaperStatus: PaperStatusRequest
  setSelectedPaperStatus: (paperStatus: PaperStatusRequest) => void
}

// export const usePaperStatusStore = create<PaperStatusState>((set) => ({
//   selectedPaperStatus: PaperStatus.PENDING,
//
//   setSelectedPaperStatus: (paperStatus) => set({ selectedPaperStatus: paperStatus }),
// }))

export const usePaperStatusStore = create<PaperStatusState>()(
  persist(
    (set) => ({
      selectedPaperStatus: PaperStatus.PENDING,

      setSelectedPaperStatus: (paperStatus) => set({ selectedPaperStatus: paperStatus }),
    }),
    {
      name: 'paperStatusStore',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
