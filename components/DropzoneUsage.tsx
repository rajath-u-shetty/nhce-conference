// 'use client';

// import {
//   MultiFileDropzone,
//   type FileState,
// } from '@/components/Dropzone';
// import { useEdgeStore } from '@/lib/edgestore';
// import { useState } from 'react';

// export function MultiFileDropzoneUsage() {
//   const [fileStates, setFileStates] = useState<FileState[]>([]);
//   const { edgestore } = useEdgeStore();

//   function updateFileProgress(key: string, progress: FileState['progress']) {
//     setFileStates((fileStates) => {
//       const newFileStates = structuredClone(fileStates);
//       const fileState = newFileStates.find(
//         (fileState) => fileState.key === key,
//       );
//       if (fileState) {
//         fileState.progress = progress;
//       }
//       return newFileStates;
//     });
//   }

//   return (
//     <div>
//       <MultiFileDropzone
//         value={fileStates}
//         onChange={(files) => {
//           setFileStates(files);
//         }}
//         onFilesAdded={async (addedFiles) => {
//           setFileStates([...fileStates, ...addedFiles]);
//           await Promise.all(
//             addedFiles.map(async (addedFileState) => {
//               try {
//                 const res = await edgestore.publicFiles.upload({
//                   file: addedFileState.file,
//                   onProgressChange: async (progress) => {
//                     updateFileProgress(addedFileState.key, progress);
//                     if (progress === 100) {
//                       // wait 1 second to set it to complete
//                       // so that the user can see the progress bar at 100%
//                       await new Promise((resolve) => setTimeout(resolve, 1000));
//                       updateFileProgress(addedFileState.key, 'COMPLETE');
//                     }
//                   },
//                 });
//                 console.log(res);
//               } catch (err) {
//                 updateFileProgress(addedFileState.key, 'ERROR');
//               }
//             }),
//           );
//         }}
//       />
//     </div>
//   );
// }

'use client'
import { MultiFileDropzone, type FileState } from '@/components/Dropzone'
import { useFileStore } from '@/lib/stores/FileUploadStore'
import { useState } from 'react'
import { Button } from './ui/button'
import { useEdgeStore } from '@/lib/edgestore'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { AuthSession } from "@/lib/auth/utils";

type Props = {
  error?: string
  required?: boolean
  session?: AuthSession["session"];
}

export function MultiFileDropzoneUsage({ error, required = true, session }: Props) {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const { pdfUploaded, setPdfUploaded,  pendingFile, setPendingFile, selectedFile, setSelectedFile } = useFileStore()
  const { edgestore } = useEdgeStore()
  const { toast } = useToast()
  const router = useRouter()

  const handleRemoveFile = () => {
    setFileStates([])
    setPendingFile(null)
    setPdfUploaded(false)
  }

  if (!session || !session.user) {
    router.push('/sign-in')
    return <div>Please login to upload a file</div>
  }


  const handleUpload = async () => {
    if (!selectedFile && pendingFile) {
      try {
        const res = await edgestore.publicFiles.upload({
          file: pendingFile,
        })

        setSelectedFile({
          fileUrl: res.url,
          fileSize: res.size,
          userId: session.user.id,
          uploadedBy: session.user.name || session.user.email!,
          uploadedAt: res.uploadedAt.toISOString(),
          name: pendingFile.name
        })

        toast({
          title: "Success",
          description: "Chapter paper uploaded successfully",
          variant: "default",
        })

        setPdfUploaded(true)

      } catch (error) {
        toast({
          title: 'Error uploading file',
          description: 'Failed to upload research paper. Please try again by uploading a valid PDF file.',
          variant: 'destructive',
        })
        return
      }
    }
  }

  return (
    <div className="space-y-2 text-sm text-gray-600">
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files)
          if (files.length === 0) {
            handleRemoveFile()
          }
        }}
        onFilesAdded={(addedFiles) => {
          if (addedFiles.length > 0) {
            setFileStates([...fileStates, ...addedFiles])
            setPendingFile(addedFiles[0].file)
          }
        }}
      />
      <div className="space-y-2 flex justify-between">
        {required && !selectedFile && !pendingFile ? (
          <p className="text-sm text-red-500 ">
            {error || 'Please upload a research paper file'}
          </p>
        ) : (
          <p className='text-sm text-green-400 '>
            File ready for upload: {pendingFile!.name}
          </p>
        )}
        <Button onClick={() => handleUpload()} disabled={pdfUploaded}>Upload</Button>
      </div>
    </div>
  )
}
