"use client"

import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import * as React from "react"

export const MediaDialog = DialogPrimitive.Root
export const MediaDialogTrigger = DialogPrimitive.Trigger
export const MediaDialogPortal = DialogPrimitive.Portal
export const MediaDialogClose = DialogPrimitive.Close

export const MediaDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-black/80 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
MediaDialogOverlay.displayName = "MediaDialogOverlay"

export const MediaDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <MediaDialogPortal>
    <MediaDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      {...props}
      className={cn("fixed inset-0 z-50 flex items-center justify-center outline-none", className)}
    >
      {/* Media wrapper */}
      <div
        className="relative w-[90vw] max-w-[1200px] overflow-hidden rounded-xl bg-black"
        onClick={(e) => e.stopPropagation()} // stops clicks on media from closing
      >
        {children}

        {/* Close button inside media */}
        <MediaDialogClose className="absolute top-2 right-2 z-50 rounded-full bg-black/60 p-2 transition hover:bg-black/80">
          <X className="h-6 w-6 text-white" />
          <span className="sr-only">Close</span>
        </MediaDialogClose>
      </div>
    </DialogPrimitive.Content>
  </MediaDialogPortal>
))

MediaDialogContent.displayName = "MediaDialogContent"
