'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StepIndicator } from './step-indicator'
import { AuthorDetailsForm } from './author-details-form'
import { CoAuthorDetailsForm } from './co-author-details-form'
import { UploadPaperForm } from './upload-paper-form'
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const authorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  designation: z.string().min(2, { message: "Designation must be at least 2 characters." }),
  institute: z.string().min(2, { message: "Institute must be at least 2 characters." }),
})

type AuthorDetails = z.infer<typeof authorSchema>

type CoAuthorDetails = {
  name: string
  email: string
  designation: string
  institute: string
}

export default function MultiPageForm() {
  const [currentPage, setCurrentPage] = useState(0)
  const [coAuthors, setCoAuthors] = useState<CoAuthorDetails[]>(Array(5).fill({
    name: '',
    email: '',
    designation: '',
    institute: ''
  }))
  const [file, setFile] = useState<File | null>(null)

  const authorForm = useForm<AuthorDetails>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: '',
      email: '',
      mobileNumber: '',
      designation: '',
      institute: ''
    }
  })

  const handleNext = async () => {
    if (currentPage === 0) {
      const isValid = await authorForm.trigger()
      if (!isValid) return
    }
    setCurrentPage((prev) => Math.min(prev + 1, 6))
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (data: AuthorDetails) => {
    console.log('Form submitted', { authorDetails: data, coAuthors, file })
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            {currentPage === 0 ? 'Author Details' : 
             currentPage === 6 ? 'Upload Research Paper' : 
             `Co-Author ${currentPage} Details`}
          </CardTitle>
          <StepIndicator currentStep={currentPage} totalSteps={7} />
        </CardHeader>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="min-h-[400px] flex items-center justify-center">
              {currentPage === 0 && (
                <AuthorDetailsForm form={authorForm} />
              )}
              {currentPage > 0 && currentPage < 6 && (
                <CoAuthorDetailsForm
                  coAuthorDetails={coAuthors[currentPage - 1]}
                  setCoAuthorDetails={(details) => {
                    const newCoAuthors = [...coAuthors]
                    newCoAuthors[currentPage - 1] = details
                    setCoAuthors(newCoAuthors)
                  }}
                />
              )}
              {currentPage === 6 && (
                <UploadPaperForm file={file} setFile={setFile} />
              )}
            </CardContent>
          </motion.div>
        </AnimatePresence>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            disabled={currentPage === 0}
            variant="outline"
          >
            Previous
          </Button>
          {currentPage < 6 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={authorForm.handleSubmit(handleSubmit)}>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
