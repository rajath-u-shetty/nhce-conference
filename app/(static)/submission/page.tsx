'use client'
import React from 'react'
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
  const termsDetails = [
    {
      title: "Presentation Mode",
      content: "The authors can present their paper through virtual mode (limited) and physical presentation. The registration fees will remain same for both. For authors, one regular registration covers one accepted paper."
    },
    {
      title: "Submission Guidelines",
      content: "The paper must adhere to the journal's format, scope, and submission guidelines. Failure to follow submission requirements may result in rejection."
    },
    {
      title: "Original Work",
      content: "The manuscript must be original and not published elsewhere. This means the work should not have been previously published in any form, including conference proceedings, journals, or online platforms."
    },
    {
      title: "Author Contribution",
      content: "All listed authors must have made a significant contribution to the research and the paper. Contributions can include conceptualization, methodology, data collection, analysis, writing, or critical review of the manuscript."
    },
    {
      title: "Author Approval",
      content: "All authors must agree to the final version and submission. This requires a formal consensus and approval process among all contributing authors before submission."
    },
    {
      title: "Plagiarism Policy",
      content: "The work must be free from plagiarism, including self-plagiarism and AI-generated content. The maximum acceptable similarity is less than 10%. All sources must be properly cited and referenced."
    },
    {
      title: "Ethics Approval",
      content: "For research involving humans or animals, appropriate ethical approval must be documented. This includes obtaining informed consent, ensuring participant rights, and following institutional review board (IRB) guidelines."
    },
    {
      title: "Conflict of Interest",
      content: "Authors must disclose any financial, personal, or professional conflicts of interest that could potentially influence the research or its interpretation. This includes funding sources, consultancies, and personal relationships."
    },
    {
      title: "Data Availability",
      content: "Authors may be required to make their research data available in a public repository or provide access upon request. This promotes transparency and reproducibility of research."
    },
    {
      title: "Publication Ethics",
      content: "Authors are expected to follow the highest standards of publication ethics. This includes accurate reporting of research, proper attribution of sources, and avoiding duplicate submissions."
    }
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

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full bg-orange-500 text-white hover:bg-orange-600">
              View Full Terms and Conditions
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="text-orange-600">Comprehensive Terms and Conditions</DrawerTitle>
              <DrawerDescription className="text-orange-400">
                Please read and understand all terms carefully before submission
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4 space-y-4">
              {termsDetails.map((term, index) => (
                <div key={index} className="border-b border-orange-200 pb-4">
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">
                    {term.title}
                  </h3>
                  <p className="text-orange-400 font-mono">
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