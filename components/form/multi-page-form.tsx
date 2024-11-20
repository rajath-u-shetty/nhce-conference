'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StepIndicator } from './step-indicator'
import { AuthorDetailsForm } from './author-details-form'
import { CoAuthorDetailsForm } from './co-author-details-form'
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MultiFileDropzoneUsage } from '../DropzoneUsage'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  AuthorDetails,
  authorSchema,
  CoAuthorDetails,
  FileUploadRequest,
  MultiFormRequest,
  PaperDetailsRequest,
  paperDetailsValidator
} from '@/lib/validators/formValidator'
import { PaperDetailsForm } from './paper-details'

export default function MultiPageForm() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coAuthors, setCoAuthors] = useState<CoAuthorDetails[]>(Array(5).fill({
    name: '',
    email: '',
    designation: '',
    institute: ''
  }));
  const [file, setFile] = useState<FileUploadRequest | null>(null)
  const { toast } = useToast()
  const [fileError, setFileError] = useState<string>('');

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

  const paperDetailsForm = useForm<PaperDetailsRequest>({
    resolver: zodResolver(paperDetailsValidator),
    defaultValues: {
      title: '',
      abstract: ''
    }
  })

  const resetForms = () => {
    // Reset all form states
    authorForm.reset()
    paperDetailsForm.reset()
    setCoAuthors(Array(5).fill({
      name: '',
      email: '',
      designation: '',
      institute: ''
    }))
    setFile(null)
    setFileError('')
    setCurrentPage(0)
  }

  const handleNext = async () => {
    if (currentPage === 0) {
      const isValid = await authorForm.trigger()
      if (!isValid) return
    }
    if (currentPage === 1) {
      const isValid = await paperDetailsForm.trigger()
      if (!isValid) return
    }
    setCurrentPage((prev) => Math.min(prev + 1, 7))
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  // In your MultiPageForm component, update the handleSubmit function:

  const handleSubmit = async (authorData: AuthorDetails) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Validate required fields
      if (!file?.fileUrl || !file?.fileSize || !file?.userId || !file?.uploadedBy || !file?.name) {
        setFileError('Please upload a research paper file before submitting');
        return;
      }

      const paperDetailsData = paperDetailsForm.getValues();
      if (!paperDetailsData.title || !paperDetailsData.abstract) {
        toast({
          title: "Error",
          description: "Paper title and abstract are required",
          variant: "destructive",
        });
        return;
      }

      // Filter out empty co-author entries
      const validCoAuthors = coAuthors.filter(author =>
        author.name || author.email || author.designation || author.institute
      );

      const payload: MultiFormRequest = {
        author: {
          name: authorData.name,
          email: authorData.email,
          mobileNumber: authorData.mobileNumber,
          designation: authorData.designation,
          institute: authorData.institute
        },
        coAuthors: validCoAuthors,
        file: {
          name: file.name,
          fileUrl: file.fileUrl,
          fileSize: file.fileSize,
          userId: file.userId,
          uploadedAt: file.uploadedAt,
          uploadedBy: file.uploadedBy,
        },
        userId: file.userId,
        paperDetails: paperDetailsData
      };

      const response = await axios.post("/api/submit-paper", payload);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Research paper submitted successfully",
          variant: "default",
        });

        // Reset forms
        resetForms();

        // Redirect to dashboard
        router.push('/dashboard');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Submission error:', error);

      // Handle specific error responses
      const errorMessage = error.response?.data?.message || "Error submitting paper";

      // Handle specific HTTP status codes
      switch (error.response?.status) {
        case 408:
          toast({
            title: "Timeout Error",
            description: "Request timed out. Please try submitting again.",
            variant: "destructive",
          });
          break;
        case 409:
          toast({
            title: "Duplicate Entry",
            description: "A paper with this information already exists.",
            variant: "destructive",
          });
          break;
        case 401:
          toast({
            title: "Authentication Error",
            description: "Please log in to submit your paper.",
            variant: "destructive",
          });
          router.push('/login');
          break;
        default:
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 0:
        return 'Author Details'
      case 1:
        return 'Paper Details'
      case 7:
        return 'Upload Research Paper'
      default:
        return `Co-Author ${currentPage - 1} Details`
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            {getPageTitle()}
          </CardTitle>
          <StepIndicator currentStep={currentPage} totalSteps={8} />
        </CardHeader>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="min-h-[400px] flex flex-col items-center justify-center">
              {currentPage === 0 && (
                <AuthorDetailsForm form={authorForm} />
              )}
              {currentPage === 1 && (
                <PaperDetailsForm form={paperDetailsForm} />
              )}
              {currentPage > 1 && currentPage < 7 && (
                <CoAuthorDetailsForm
                  coAuthorDetails={coAuthors[currentPage - 2]}
                  setCoAuthorDetails={(details) => {
                    const newCoAuthors = [...coAuthors]
                    newCoAuthors[currentPage - 2] = details
                    setCoAuthors(newCoAuthors)
                  }}
                />
              )}
              <div className="w-1/2 h-full max-h-44">
                {currentPage === 7 && (
                  <MultiFileDropzoneUsage
                    file={file}
                    setFile={setFile}
                    error={fileError}
                    required
                  />
                )}
              </div>
            </CardContent>
          </motion.div>
        </AnimatePresence>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 0 || isSubmitting}
            variant="outline"
          >
            Previous
          </Button>
          {currentPage < 7 ? (
            <Button onClick={handleNext} disabled={isSubmitting}>Next</Button>
          ) : (
            <Button
              onClick={authorForm.handleSubmit(handleSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
