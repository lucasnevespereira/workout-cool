import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ExerciseVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  title: string;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

export function ExerciseVideoModal({ open, onOpenChange, videoUrl, title }: ExerciseVideoModalProps) {
  const youTubeEmbed = getYouTubeEmbedUrl(videoUrl);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-2">
          <DialogTitle className="text-base">{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          {videoUrl ? (
            youTubeEmbed ? (
              <iframe
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-0"
                src={youTubeEmbed}
                title={title}
              />
            ) : (
              <video
                autoPlay
                className="w-full h-full object-contain bg-black"
                controls
                poster=""
                src={videoUrl}
              />
            )
          ) : (
            <div className="text-white text-center p-8">No video available.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}