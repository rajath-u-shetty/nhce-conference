import { toast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import axios from "axios"
import { PaperStatus } from "@prisma/client"

export const useCustomToast = () => {
  const undoAcceptanceToast = ({ paperId, statusFilter }: {
    paperId: string, 
    statusFilter: PaperStatus | 'ALL'
  }) => {
    const handleAcceptanceUndo = async () => {
      try {
        const { data } = await axios.post('/api/papers/undo', { 
          PaperId: paperId,
          statusFilter
        })
        toast({
          title: 'Paper Status Updated',
          description: `Reverted to ${data.status}`,
          variant: 'default'
        })
        return data
      } catch (error) {
        toast({
          title: 'Undo Failed',
          description: 'Could not update paper status',
          variant: 'destructive'
        })
      }
    }

    toast({
      title: 'Undo Action',
      description: 'You can revert the paper status',
      variant: 'default',
      duration: 5000,
      action: (
        <Button 
          variant="outline"
          onClick={handleAcceptanceUndo}
        >
          Undo
        </Button>
      )
    })
  }

  const undoRejectionToast = ({ paperId, statusFilter }: {
    paperId: string, 
    statusFilter: PaperStatus | 'ALL'
  }) => {
    const handleRejectionUndo = async () => {
      try {
        const { data } = await axios.post('/api/papers/undo', { 
          PaperId: paperId,
          statusFilter
        })
        toast({
          title: 'Paper Status Updated',
          description: `Reverted to ${data.status}`,
          variant: 'default'
        })
        return data
      } catch (error) {
        toast({
          title: 'Undo Failed',
          description: 'Could not update paper status',
          variant: 'destructive'
        })
      }
    }

    toast({
      title: 'Undo Action',
      description: 'You can revert the paper status',
      variant: 'default',
      duration: 5000,
      action: (
        <Button 
          variant="outline"
          onClick={handleRejectionUndo}
        >
          Undo
        </Button>
      )
    })
  }

  return { undoAcceptanceToast, undoRejectionToast }
}
