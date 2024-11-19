import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@radix-ui/react-scroll-area"

export default function TableSkeleton() {
  return (
    <ScrollArea className="w-full h-screen">
      <Table>
        <TableHeader>
          <TableRow className='text-white'>
            <TableHead className="w-[50%]">
              <Skeleton className="flex1 h-4 rounded-md" />
            </TableHead>
            <TableHead>
              <Skeleton className="flex-1 h-4 rounded-md" />
            </TableHead>
            <TableHead className='space-x-2 dark:text-white text-black'>
              <Skeleton className="flex-1 h-4 rounded-md" />
            </TableHead>
            <TableHead>
              <Skeleton className="flex-1 h-4 rounded-md" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="flex-1 h-4 rounded-md" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-white '>
          {Array(6).fill(0).map((_, i) => (
            <TableRow className="space-y-16" >
              <TableCell>
                <Skeleton className=" h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className=" h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className=" h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className=" h-5 rounded-md" />
              </TableCell>
              <TableCell className="text-right space-y-1">
                <Skeleton className=" h-6 rounded-md" />
                <Skeleton className=" h-4 rounded-md" />
                <Skeleton className=" h-4 rounded-md" />
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </ScrollArea>

  )
}
