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

'use client';

import {
  MultiFileDropzone,
  type FileState,
} from '@/components/Dropzone';
import { useToast } from '@/hooks/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { FileUploadRequest } from '@/lib/validators/formValidator';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type Props = {
  file: FileUploadRequest | null;
  setFile: (file: FileUploadRequest | null) => void;
  error?: string;
  required?: boolean;
}

export function MultiFileDropzoneUsage({ file, setFile, error, required = true }: Props) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const { data: session } = useSession();
  
  const user = session?.user;
  if (!user) return <div>Login to Upload File...</div>;

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  // const handleRemoveFile = () => {
  //   setFileStates([]);
  //   setFile(null);
  // };

  return (
    <div className="space-y-2">
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
          if (files.length === 0) {
            setFile(null);
          }
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                setFile({
                  fileUrl: res.url,
                  fileSize: res.size,
                  userId: user.id,
                  uploadedBy: user.name || user.email!,
                  uploadedAt: res.uploadedAt.toISOString(),
                  name: addedFiles[0].file.name
                });
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
                toast({
                  title: 'Error uploading file',
                  description: 'Please try again',
                  variant: 'destructive',
                });
              }
            }),
          );
        }}
      />
      {required && !file && (
        <p className="text-sm text-red-500">
          {error || 'Please upload a research paper file'}
        </p>
      )}
    </div>
  );
}