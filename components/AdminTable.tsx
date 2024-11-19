'use client'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, NotebookPen, ChevronDown } from 'lucide-react'
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

interface PaperPayload {
  status: PaperStatusRequest
}

export const AdminTable = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { setSelectedPaper, approvePaper, rejectPaper } = usePaperStore()
  const [statusFilter, setStatusFilter] = useState<PaperStatusRequest>(PaperStatus.PENDING)

  const { data: papers, isLoading, error } = useQuery({
    queryKey: ['papers', statusFilter],
    queryFn: async () => {
      const payload: PaperPayload = {
        status: statusFilter,
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
      toast({ description: "Paper Approved", duration: 5000 })
      queryClient.invalidateQueries({ queryKey: ['papers'] })
    }
  })

  const { mutate: serverRejectPaper } = useMutation({
    mutationFn: async (paperId: string) => {
      const payload: PaperIdRequest = { PaperId: paperId }
      const { data } = await axios.post('/api/papers/reject', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast({
          title: err.response?.status === 401 ? 'Unauthorized' : 'Error',
          description: err.response?.status === 401
            ? 'Please login to reject the paper'
            : 'Cannot reject the paper',
          variant: 'destructive',
        })
      }
    },
    onSuccess: (_, paperId) => {
      rejectPaper(paperId)
      toast({ description: "Paper Rejected", duration: 5000 })
      queryClient.invalidateQueries({ queryKey: ['papers'] })
    }
  })

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading papers</div>
  if (!papers) return <div>No papers found</div>

  const filteredPapers = papers.filter(paper =>
    statusFilter === 'ALL' || paper.status === statusFilter
  )

  return (
    <ScrollArea className="w-full h-screen">
      <Table>
        <TableHeader>
          <TableRow className='text-white'>
            <TableHead className="w-[50%]">Paper Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className='space-x-2 dark:text-white text-black'>
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
                    onSelect={() => setStatusFilter('PENDING')}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='py-2 px-4'
                    onSelect={() => setStatusFilter('APPROVED')}>
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='py-2 px-4'
                    onSelect={() => setStatusFilter("REJECTED")}>
                    Rejected
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='py-2 px-4'
                    onSelect={() => setStatusFilter('ALL')}>
                    View All
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </TableHead>
            <TableHead>Submitted At</TableHead>
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
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              onClick={() => handlePaperClick(paper)}
            >
              <TableCell>
                <Link href={paper.url} target='_blank' className="hover:underline text-left">
                  {paper.title}
                </Link>
              </TableCell>
              <TableCell>{paper.authors[0]?.name}</TableCell>
              <TableCell>{paper.status}</TableCell>
              <TableCell>{new Date(paper.updatedAt).toLocaleString()}</TableCell>
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
                  onClick={(e) => {
                    e.stopPropagation()
                    serverApprovePaper(paper.id)
                  }}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 mr-2"
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
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </TableCell>
            </motion.tr>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No pending papers
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
