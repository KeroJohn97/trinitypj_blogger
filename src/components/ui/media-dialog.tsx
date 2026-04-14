"use client"

import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { VisuallyHidden } from "radix-ui"
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
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center outline-none p-4 sm:p-6",
        className
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto relative max-w-full max-h-full flex items-center justify-center">
          {children}

          {/* Global Close Button */}
          <MediaDialogClose className="absolute -top-12 right-0 lg:-right-12 lg:top-0 z-50 rounded-full bg-black/20 p-2 transition hover:bg-black/40 backdrop-blur-md">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </MediaDialogClose>
        </div>
      </div>
    </DialogPrimitive.Content>
    {/* Add this block here */}
    <VisuallyHidden.Root>
      <DialogPrimitive.Title>Media Preview</DialogPrimitive.Title>
      <DialogPrimitive.Description>
        Viewing media content in full screen.
      </DialogPrimitive.Description>
    </VisuallyHidden.Root>
  </MediaDialogPortal>
))

MediaDialogContent.displayName = "MediaDialogContent"
