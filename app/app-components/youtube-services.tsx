import youtube from "@/../assets/live-stream.jpg"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import Link from "next/link"

const YoutubeServices = () => {
  return (
    <div className="my-8">
      {/* <Link href={"https://www.youtube.com/@tmcpj"}> */}
      <Dialog>
        <DialogTrigger asChild>
          <Image src={youtube} alt="Youtube Live Stream" className="mx-auto rounded-lg" />
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

      {/* </Link> */}
    </div>
  )
}

export default YoutubeServices
