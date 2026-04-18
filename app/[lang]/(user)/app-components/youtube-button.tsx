import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play } from "lucide-react"

// Define the interface for the dictionary entries we need
interface YoutubeButtonProps {
  dict: {
    watchLive: string
    videoTitle: string
    videoDesc: string
  }
}

const YoutubeButton = ({ dict }: YoutubeButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="bg-white font-semibold">
          <Play className="mr-2 h-4 w-4" />
          {/* Translated Text */}
          {dict.watchLive}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl overflow-hidden p-0">
        {/* Translated Accessibility Text */}
        <DialogTitle className="sr-only">{dict.videoTitle}</DialogTitle>
        <DialogDescription className="sr-only">{dict.videoDesc}</DialogDescription>

        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/live_stream?channel=${process.env.YOUTUBE_CHANNEL_ID}&autoplay=1`}
            title={dict.videoTitle} // Good practice to translate iframe title too
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default YoutubeButton
