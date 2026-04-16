import { Loader } from "@/components/ui/loader"

export default function AdminLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50/50">
      <Loader loading={true} overlay={false} text="Initialising Admin Portal..." />
    </div>
  )
}
