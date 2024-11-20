import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ReviewerCommentsSchema = z.object({
  comment: z.string().min(2, { message: "Comment must be at least 2 characters." }),
})

type ReviewerCommentsRequest = z.infer<typeof ReviewerCommentsSchema>


export const ReviewerCommentsForm = () => {
    const form = useForm<ReviewerCommentsRequest>({
    resolver: zodResolver(ReviewerCommentsSchema),
    defaultValues: {
      comment: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  if (isLoading) return <div>Loading...</div>

  return (
    <div>helo</div>
  )
}

