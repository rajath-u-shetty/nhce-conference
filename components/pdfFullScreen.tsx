import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Expand, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import SimpleBar from "simplebar-react";
import { Document, Page } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import { useToast } from "@/hooks/use-toast";

const PdfFullScreen = ({ fileUrl }: { fileUrl: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numpages, setNumpages] = useState<number>();
  const { toast } = useToast();

  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button  variant="ghost" aria-label="fullscreen">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 my-24 animate-spin" />
                </div>
              }
              onLoadError={() => {
                return toast({
                  title: "Error Loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => setNumpages(numPages)}
              file={fileUrl}
              className="max-h-full"
            >
              {new Array(numpages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullScreen;

