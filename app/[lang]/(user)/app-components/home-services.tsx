import worship from "@/../assets/worship.png"
import Image from "next/image"

const HomeServices = () => {
  return (
    <div className="my-8">
      <Image src={worship} alt="Worship Service Time" className="mx-auto rounded-lg" />
    </div>
  )
}

export default HomeServices
