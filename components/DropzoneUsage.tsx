'use client';

import {
  MultiFileDropzone,
  type FileState,
} from '@/components/Dropzone';
import { useToast } from '@/hooks/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { FileUploadRequest } from '@/lib/validators/FileUploadValidator';
import { User } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';


export function MultiFileDropzoneUsage() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const {data: session} = useSession()
  
  const user = session?.user;
  if(!user) return <div>Login to Upload File...</div>

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

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
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
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });

                const defaultName = user.email!.split('@')[0].trim();
                const payload: FileUploadRequest = {
                  fileUrl: res.url,
                  fileSize: res.size,
                  userId: user.id,
                  uploadedBy: user.name || defaultName,
                  updatedAt: res.uploadedAt.toISOString(),
                  name: addedFiles[0].file.name
                }

                const response = await axios.post("/api/submit-paper", payload);
                if (response.status === 200) {
                  toast({
                    title: "File uploaded successfully",
                    description: "Your file has been uploaded successfully",
                    variant: "default",
                  });
                }else if (response.status === 500) {
                  toast({
                    title: "Error",
                    description: "error uploading file",
                    variant: "destructive",
                  });
                }
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
    </div>
  );
}
