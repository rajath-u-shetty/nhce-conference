'use client'
import React, { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import MultiPageForm from '@/components/form/multi-page-form'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

const TermsAndConditionsPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const termsDetails = [
    {
      title: "Original Work",
      content: "The manuscript must be original and not published elsewhere."
    },
    {
      title: "Contribution",
      content: "All listed authors must have made a significant contribution to the research and the paper."
    },
    {
      title: "Approval",
      content: "All authors must agree to the final version and submission."
    },
    {
      title: "Plagiarism Policy",
      content: "The work must be free from plagiarism, including self-plagiarism and AI plagiarism (less than 10%)."
    },
    {
      title: "Ethics Approval",
      content: "For research involving humans or animals, appropriate ethical approval must be documented."
    },
    {
      title: "Conflict of Interest",
      content: "Authors must disclose any financial or personal conflicts of interest."
    },
    {
      title: "Data Availability",
      content: "Authors may be required to make their data available in a public repository or upon request."
    },
  ]

  return (
    <SessionProvider>
      <MultiPageForm />
      <div className='flex flex-col gap-5 ml-10 mr-10'>
        <div className='text-3xl font-bold text-orange-600'>
          <div className='text-red-600'>
            TERMS & CONDITIONS
          </div>
        </div>

        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full bg-orange-500 text-white hover:bg-orange-600">
              View Full Terms and Conditions
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="text-orange-600">Comprehensive Terms and Conditions</DrawerTitle>
              <DrawerDescription className="text-white">
                Please read and understand all terms carefully before submission
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4 space-y-4">
              {termsDetails.map((term, index) => (
                <div key={index} className="border-b border-orange-200 pb-4">
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">
                    {term.title}
                  </h3>
                  <p className="text-white font-mono">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>
            
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="bg-red-500 text-white hover:bg-red-600">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </SessionProvider>
  )
}

export default TermsAndConditionsPage