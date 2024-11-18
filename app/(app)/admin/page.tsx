'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Sun, Moon, Notebook, TextIcon, NotebookPen } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from "axios"
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import PdfRenderer from '@/components/pdfRenderer'
import { PaperIdRequest } from '@/lib/validators/PaperValidators'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'

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

export default function AdminDashboard() {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const { theme, setTheme } = useTheme()
  const [comments, setComments] = useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper)
    console.log(paper)
    console.log(paper.url)
  }

  // Fetch papers query with automatic polling
  const { data: papers, isLoading, error } = useQuery({
    queryKey: ['papers'],
    queryFn: async () => {
      const { data } = await axios.get('/api/papers');
      return data as Paper[];
    },
    refetchOnWindowFocus: true, // Refetch when window regains focus
    retry: 3, // Retry failed requests 3 times
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
  })

  // Approve paper mutation
  const { mutate: approvePaper } = useMutation({
    mutationFn: async (paperId: string) => {
      const payload: PaperIdRequest = {
        PaperId: paperId
      }
      const { data } = await axios.post('/api/papers/approve', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            title: 'Unauthorized',
            description: 'Please login to approve the paper',
            variant: 'destructive',
          })
        }
        return toast({
          title: 'Error',
          description: 'Cannot approve the paper',
          variant: 'destructive',
        })
      }
    },
    onSuccess: (_, paperId) => {
      // Immediately update the cache to reflect the change
      queryClient.setQueryData(['papers'], (oldData: Paper[] | undefined) => {
        if (!oldData) return []
        return oldData.map(paper =>
          paper.id === paperId
            ? { ...paper, status: 'APPROVED' }
            : paper
        )
      })

      // Invalidate and refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['papers'] })

      // Show success toast
      toast({
        description: "Paper Approved",
      })

      // If the approved paper was selected, update its status in the preview
      if (selectedPaper?.id === paperId) {
        setSelectedPaper(prev => prev ? { ...prev, status: 'APPROVED' } : null)
      }
    }
  })

  // Reject paper mutation with similar optimistic updates
  const { mutate: rejectPaper } = useMutation({
    mutationFn: async (paperId: string) => {
      const payload: PaperIdRequest = {
        PaperId: paperId
      }
      const { data } = await axios.post('/api/papers/reject', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            title: 'Unauthorized',
            description: 'Please login to reject the paper',
            variant: 'destructive',
          })
        }
        return toast({
          title: 'Error',
          description: 'Cannot reject the paper',
          variant: 'destructive',
        })
      }
    },
    onSuccess: (_, paperId) => {
      // Immediately update the cache to reflect the change
      queryClient.setQueryData(['papers'], (oldData: Paper[] | undefined) => {
        if (!oldData) return []
        return oldData.map(paper =>
          paper.id === paperId
            ? { ...paper, status: 'REJECTED' }
            : paper
        )
      })

      // Invalidate and refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['papers'] })

      toast({
        description: "Paper Rejected",
      })

      // If the rejected paper was selected, update its status in the preview
      if (selectedPaper?.id === paperId) {
        setSelectedPaper(prev => prev ? { ...prev, status: 'REJECTED' } : null)
      }
    }
  })

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading papers</div>
  if (!papers) return <div>No papers found</div>

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="h-16 bg-primary flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>

      <div className="flex flex-1 p-6 space-x-6 overflow-hidden">
        <div className="w-1/2 overflow-auto bg-card rounded-lg shadow">
          <ScrollArea className="w-full h-[calc(100vh-250px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Paper Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.length > 0 ? papers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell onClick={() => handlePaperClick(paper)}>
                      <Link href={paper.url} target='_blank' className="text-primary hover:underline text-left">
                        {paper.title}
                      </Link>
                    </TableCell>
                    <TableCell>{paper.authors[0]?.name}</TableCell>
                    <TableCell>{paper.status}</TableCell>
                    <TableCell>{new Date(paper.updatedAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {paper.status === 'PENDING' && (
                        <>
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
                                  <DialogTitle className="leading-relaxed">Add Comments and arrange them in the order you want</DialogTitle>
                                  
                                </DialogHeader>
                              </DialogContent>

                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => approvePaper(paper.id)}
                            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 mr-2"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => rejectPaper(paper.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No papers submitted yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        <div className="w-1/2 h-screen">
          {selectedPaper ? (
            <PdfRenderer url={selectedPaper.url} />
          ) : (
            <p className="text-muted-foreground text-center mt-10">Select a paper to view its content.</p>
          )}
        </div>
      </div>
    </div>
  )
}
