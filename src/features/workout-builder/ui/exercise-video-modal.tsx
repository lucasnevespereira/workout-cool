import { X } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface ExerciseVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  title: string;
}

export function ExerciseVideoModal({ open, onOpenChange, videoUrl, title }: ExerciseVideoModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-2">
          <DialogTitle className="text-base">{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full aspect-video bg-black">
          <video
            autoPlay
            className="w-full h-full object-contain bg-black"
            controls
            poster=""
            src={videoUrl}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}