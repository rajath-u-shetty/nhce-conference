'use client'
import { AdminTable } from '@/components/AdminTable'
import PdfRenderer from '@/components/pdfRenderer'
import { usePaperStore } from '@/lib/stores/PaperStore'

export default function AdminDashboard() {
  const { selectedPaper } = usePaperStore()

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="w-1/2 p-4 overflow-auto border-r">
        <AdminTable />
      </div>

      <div className="w-1/2 p-4 overflow-auto">
        {selectedPaper ? (
          <PdfRenderer url={selectedPaper.fileUrl || selectedPaper.url} />
        ) : (
          <p className="text-muted-foreground text-center mt-10">
            Select a paper to view its content.
          </p>
        )}
      </div>
    </div>
  )
}
