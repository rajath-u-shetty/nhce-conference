// import { useCallback } from 'react'
// import { useDropzone } from 'react-dropzone'
// import { Card, CardContent } from "@/components/ui/card"

// type UploadPaperFormProps = {
//   file: File | null
//   setFile: (file: File | null) => void
// }

// export function UploadPaperForm({ file, setFile }: UploadPaperFormProps) {
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       setFile(acceptedFiles[0])
//     }
//   }, [setFile])

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//       'application/msword': ['.doc'],
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
//     },
//     multiple: false
//   })

//   return (
//     <div>
//       <Card>
//         <CardContent
//           {...getRootProps()}
//           className={`flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
//             isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600'
//           }`}
//         >
//           <input {...getInputProps()} />
//           {file ? (
//             <p className="text-center text-primary font-medium">File selected: {file.name}</p>
//           ) : isDragActive ? (
//             <p className="text-center text-primary font-medium">Drop the file here ...</p>
//           ) : (
//             <p className="text-center text-muted-foreground">
//               Drag and drop your research paper here, or <span className="text-primary font-medium">click to select a file</span>
//             </p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
