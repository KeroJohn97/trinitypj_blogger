export default function Loading() {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring: Slow Spin */}
        <div className="border-primary/30 border-t-primary border-r-primary absolute h-16 w-16 animate-[spin_3s_linear_infinite] rounded-full border-4" />

        {/* Middle Ring: Fast Spin Reverse */}
        <div className="border-primary/20 border-t-primary absolute h-10 w-10 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-4" />

        {/* Inner Dot: Pulse */}
        <div className="bg-primary h-3 w-3 animate-pulse rounded-full" />
      </div>

      {/* Optional: Loading Text */}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
