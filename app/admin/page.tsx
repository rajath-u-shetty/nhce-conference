'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Sun, Moon } from 'lucide-react'

// Define the Paper interface
interface Paper {
  id: number;
  title: string;
  author: string;
  submittedAt: string;
}

// Simulated data for submitted papers
const papers: Paper[] = [
  { id: 1, title: "Advances in AI", author: "John Doe", submittedAt: "2023-05-15T10:30:00Z" },
  { id: 2, title: "Quantum Computing Breakthroughs", author: "Jane Smith", submittedAt: "2023-05-14T14:45:00Z" },
  { id: 3, title: "Blockchain in Healthcare", author: "Alice Johnson", submittedAt: "2023-05-13T09:15:00Z" },
  { id: 4, title: "Machine Learning for Climate Change", author: "Bob Brown", submittedAt: "2023-05-12T16:20:00Z" },
  { id: 5, title: "5G Networks and IoT", author: "Charlie Davis", submittedAt: "2023-05-11T11:00:00Z" },
]

export default function AdminDashboard() {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const { theme, setTheme } = useTheme()

  const handlePaperClick = (paper: Paper) => {
    setSelectedPaper(paper)
  }

  const handleApprove = (paperId: number) => {
    console.log(`Paper ${paperId} approved`)
    // Implement approval logic here
  }

  const handleReject = (paperId: number) => {
    console.log(`Paper ${paperId} rejected`)
    // Implement rejection logic here
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Navbar */}
      <div className="h-16 bg-primary flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>

      <div className="flex flex-1 p-6 space-x-6 overflow-hidden">
        {/* Table of submitted papers */}
        <div className="w-1/2 overflow-auto bg-card rounded-lg shadow">
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
              {papers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>
                    <button
                      className="text-primary hover:underline text-left"
                      onClick={() => handlePaperClick(paper)}
                    >
                      {paper.title}
                    </button>
                  </TableCell>
                  <TableCell>{paper.author}</TableCell>
                  <TableCell>{new Date(paper.submittedAt).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApprove(paper.id)}
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 mr-2"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReject(paper.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* PDF viewer */}
        <div className="w-1/2 bg-card rounded-lg shadow p-4 overflow-auto">
          {selectedPaper ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">{selectedPaper.title}</h2>
              <p className="mb-2"><strong>Author:</strong> {selectedPaper.author}</p>
              <p className="mb-4"><strong>Submitted:</strong> {new Date(selectedPaper.submittedAt).toLocaleString()}</p>
              <div className="bg-muted p-4 rounded">
                <p className="text-muted-foreground">PDF content would be displayed here.</p>
                <p className="text-muted-foreground">Implement a PDF viewer component for actual content.</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center mt-10">Select a paper to view its content.</p>
          )}
        </div>
      </div>
    </div>
  )
}
