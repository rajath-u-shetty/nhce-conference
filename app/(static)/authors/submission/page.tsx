'use client'
import MultiPageForm from '@/components/form/multi-page-form'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const page = async () => {
  return (
    <SessionProvider>
      <MultiPageForm />
    </SessionProvider>
  )
}

export default page
