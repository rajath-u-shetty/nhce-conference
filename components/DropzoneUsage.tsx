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
import { useToast } from '@/hooks/use-toast'
import { useFileStore } from '@/lib/stores/FileUploadStore'
import { useState } from 'react'

type Props = {
  error?: string
  required?: boolean
}

export function MultiFileDropzoneUsage({ error, required = true }: Props) {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const { pendingFile, setPendingFile, selectedFile } = useFileStore()
  const { toast } = useToast()

  const handleRemoveFile = () => {
    setFileStates([])
    setPendingFile(null)
  }

  return (
    <div className="space-y-2">
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
      {required && !selectedFile && (
        <p className="text-sm text-red-500">
          {error || 'Please upload a research paper file'}
        </p>
      )}
      {pendingFile && (
        <div className="mt-2 text-sm text-gray-600">
          File ready for upload: {pendingFile.name}
        </div>
      )}
    </div>
  )
}
