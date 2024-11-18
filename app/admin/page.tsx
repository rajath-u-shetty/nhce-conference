'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Sun, Moon } from 'lucide-react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from "axios"
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import PdfRenderer from '@/components/pdfRenderer'
import { PaperIdRequest } from '@/lib/validators/PaperValidators'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

// Define the Paper interface
interface Paper1 {
  id: number;
  title: string;
  author: string;
  submittedAt: string;
}

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
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper)
  }

  const { mutate: approvePaper } = useMutation({
    mutationFn: async (paperId: string) => {
      try {
        const payload: PaperIdRequest = {
          PaperId: paperId
        }
        const { data } = await axios.post('/api/papers/approve', payload);

        return data
      } catch (e) {
        console.log("error approving paper", e);
      }
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
    onSuccess: () => {
      toast({
        description: "Paper Approved",
      })
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['papers'] })
    }
  })

    const { mutate: rejectPaper } = useMutation({
    mutationFn: async (paperId: string) => {
      try {
        const payload: PaperIdRequest = {
          PaperId: paperId
        }
        const { data } = await axios.post('/api/papers/reject', payload);

        return data
      } catch (e) {
        console.log("error approving paper", e);
      }
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
    onSuccess: () => {
      toast({
        description: "Paper Rejected",
      })
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['papers'] })
    }
  })


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const { data: papers, isLoading, error } = useQuery({
    queryKey: ['papers'],
    queryFn: async () => {
      try {
        const { data } = await axios.get('/api/papers');
        return data as Paper[];
      } catch (e) {
        console.log("error fetching papers in admin dashboard", e);
      }
    },
  })

  if (!papers) return <div>Loading...</div>

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="h-16 bg-primary flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>

      <div className="flex flex-1 p-6 space-x-6 overflow-hidden">
        {/* Table of submitted papers */}
        <div className="w-1/2 overflow-auto bg-card rounded-lg shadow">
          <ScrollArea className="w-full h-[calc(100vh-250px)] ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Paper Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.length > 0 ? papers?.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell onClick={() => handlePaperClick(paper)}>
                      <Link href={paper.url} target='_blank' className="text-primary hover:underline text-left">
                        {paper.title}
                      </Link>
                    </TableCell>
                    <TableCell>{paper.authors[0]?.name}</TableCell>
                    <TableCell>{new Date(paper.updatedAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
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
                    </TableCell>
                  </TableRow>
                )) : (
                  <div>
                    no papers submitted yet
                  </div>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* PDF viewer */}
        <div className="w-1/2" >
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
