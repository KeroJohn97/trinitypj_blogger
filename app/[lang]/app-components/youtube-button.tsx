import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play } from "lucide-react"

const YoutubeButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="bg-white font-semibold" href={"#"}>
          <Play className="mr-2 h-4 w-4" />
          Watch Live Stream
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        <DialogTitle className="sr-only">YouTube Video</DialogTitle>
        <DialogDescription className="sr-only">A YouTube video player inside a dialog</DialogDescription>
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/live_stream?channel=${process.env.YOUTUBE_CHANNEL_ID}&autoplay=1`}
            title="YouTube video player"
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
