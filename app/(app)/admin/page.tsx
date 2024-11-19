'use client'
import { AdminTable } from '@/components/AdminTable'
import PdfRenderer from '@/components/pdfRenderer'
import { usePaperStore } from '@/lib/stores/PaperStore'

export default function AdminDashboard() {
  const { selectedPaper } = usePaperStore()
  
  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
      <div className=' w-full max-w-8xl grow lg:flex xl:px-2'>
        <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
          <AdminTable />
        </div>
        <div className='flex-1 xl:flex px-2 overflow-hidden'>
          {selectedPaper ? (
            <PdfRenderer url={selectedPaper.fileUrl || selectedPaper.url} />
          ) : (
            <p className="text-muted-foreground text-center mt-10">Select a paper to view its content.</p>
          )}
        </div>
      </div>
    </div>
  )
}
