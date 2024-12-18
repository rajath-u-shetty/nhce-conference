'use client'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, NotebookPen, ChevronDown, FileX2, ArrowUp, ArrowDown } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from "axios"
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PaperIdRequest } from '@/lib/validators/PaperValidators'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import React from 'react'
import { usePaperStore } from '@/lib/stores/PaperStore'
import { motion } from 'framer-motion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { PaperStatus } from "@prisma/client"
import TableSkeleton from './TableSkeleton'
import { useCustomToast } from './AcceptanceUndoHook'
import { usePaperStatusStore } from '@/lib/stores/PaperStatusStore'

type Paper = {
  title: string;
  url: string;
  id: string;
  status: string;
  updatedAt: string;
  authors: {
    name: string;
  }[],
}

type PaperStatusRequest = PaperStatus | 'ALL'
type SortedOrder = 'asc' | 'desc'

interface PaperPayload {
  status: PaperStatusRequest
  sortBy?: SortedOrder
}

export const AdminTable = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { setSelectedPaper, approvePaper, rejectPaper } = usePaperStore()
  const { undoAcceptanceToast, undoRejectionToast } = useCustomToast()
  const [sortedPapers, setSortedPapers] = useState<SortedOrder>('asc')
  const { selectedPaperStatus, setSelectedPaperStatus } = usePaperStatusStore();

  const { data: papers, isLoading, error } = useQuery({
    queryKey: ['papers', selectedPaperStatus, sortedPapers],
    queryFn: async () => {
      const payload: PaperPayload = {
        status: selectedPaperStatus,
        sortBy: sortedPapers
      }
      const { data } = await axios.get('/api/papers', { params: payload });
      return data as Paper[];
    },
    refetchOnWindowFocus: true,
    retry: 3,
    staleTime: 1000 * 60,
  })

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ['papers'] })
  // }, [statusFilter])
  //
  const { mutate: serverApprovePaper } = useMutation({
    mutationFn: async (paperId: string) => {
      const payload: PaperIdRequest = { PaperId: paperId }
      const { data } = await axios.post('/api/papers/approve', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast({
          title: err.response?.status === 401 ? 'Unauthorized' : 'Error',
          description: err.response?.status === 401
            ? 'Please login to approve the paper'
            : 'Cannot approve the paper',
          variant: 'destructive',
        })
      }
    },
    onSuccess: (_, paperId) => {
      approvePaper(paperId)
      undoAcceptanceToast({ paperId, statusFilter: selectedPaperStatus })
      queryClient.invalidateQueries({ queryKey: ['papers'] })
    }
  })

  const { mutate: serverRejectPaper } = useMutation({
    mutationFn: async (paperId: string) => {
      const payload: PaperIdRequest = { PaperId: paperId }
      const { data } = await axios.post('/api/papers/reject', payload);
      return data;
    },
    onError: () => {
      toast({
        title: 'Rejection Failed',
        description: 'Could not reject the paper',
        variant: 'destructive'
      })
    },
    onSuccess: (_, paperId) => {
      rejectPaper(paperId)
      undoRejectionToast({ paperId, statusFilter: selectedPaperStatus })
      queryClient.invalidateQueries({ queryKey: ['papers'] })
    }
  })

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper)
  }

  const handleSubmittedAtSort = () => {
    const newSortOrder = sortedPapers === 'asc' ? 'desc' : 'asc'
    setSortedPapers(newSortOrder)
  }

  if (isLoading) return (
    <TableSkeleton />
  )

  if (error) return <div>Error loading papers</div>
  if (!papers) return <div>No papers here</div>

  const filteredPapers = papers.filter(paper =>
    selectedPaperStatus === 'ALL' || paper.status === selectedPaperStatus
  )

  return (
    <ScrollArea className="w-full h-screen">
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-black text-gray-400'>
            <TableHead>
            <Button
                variant='ghost'
                size='sm'
                onClick={() => handleSubmittedAtSort()}
                className=' dark:text-gray-400 hover:text-gray-800 hover:bg-accent dark:hover:text-gray-200'
              >
                Id
                {sortedPapers === 'asc' ? 
                  <ArrowUp className='w-4 h-4 ml-1' />
                  : <ArrowDown className='w-4 h-4 ml-1' />
                }
              </Button>
            </TableHead>
            <TableHead className="w-[50%]">Paper Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className=''>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='gap-1.5'
                    aria-label='zoom'
                    variant='ghost'>
                    Status
                    <ChevronDown className='h-3 w-3 opacity-50' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='cursor-pointer bg-black p-5 rounded-xl m-0'>
                  <DropdownMenuItem
                    className='py-2 px-4'
                    onSelect={() => setSelectedPaperStatus('PENDING')}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='py-2 px-4'
                    onSelect={() => setSelectedPaperStatus('APPROVED')}>
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='py-2 px-4'
                    onSelect={() => setSelectedPaperStatus("REJECTED")}>
                    Rejected
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='py-2 px-4'
                    onSelect={() => setSelectedPaperStatus('ALL')}>
                    View All
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-white'>
          {filteredPapers.length > 0 ? filteredPapers.map((paper) => (
            <motion.tr
              key={paper.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="  transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              onClick={() => handlePaperClick(paper)}
            >
              <TableCell>{paper.id}</TableCell>
              <TableCell>
                <Link href={paper.url} target='_blank' className="hover:underline text-left">
                  {paper.title}
                </Link>
              </TableCell>
              <TableCell>{paper.authors[0]?.name}</TableCell>
              <TableCell>{paper.status}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-2'
                    >
                      <NotebookPen className="w-4 h-4 mr-1" />
                      Add Comments
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="md:min-w-[600px] max-h-[70vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="leading-relaxed">Add Comments</DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={paper.status === 'APPROVED'}
                  onClick={(e) => {
                    e.stopPropagation()
                    serverApprovePaper(paper.id)
                  }}
                  className={`${selectedPaperStatus === 'APPROVED'
                    ? 'cursor-not-allowed opacity-50'
                    : 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200'
                    }`}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    serverRejectPaper(paper.id)
                  }}
                  disabled={paper.status === 'REJECTED'}
                  className={`${selectedPaperStatus === 'REJECTED'
                    ? 'cursor-not-allowed opacity-50'
                    : 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200'
                    }`}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </TableCell>
            </motion.tr>
          )) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-12 dark:bg-gray-800 bg-slate-800 text-gray-500 dark:text-gray-400"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FileX2 className="w-16 h-16 opacity-50 mb-2" />
                  <h3 className="text-lg font-semibold">
                    {selectedPaperStatus === 'PENDING'
                      ? 'No Pending Papers'
                      : selectedPaperStatus === 'APPROVED'
                        ? 'No Approved Papers'
                        : selectedPaperStatus === 'REJECTED'
                          ? 'No Rejected Papers'
                          : 'No Papers Found'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedPaperStatus === 'PENDING'
                      ? 'Papers will appear here once submitted'
                      : 'Try adjusting your filter'}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
