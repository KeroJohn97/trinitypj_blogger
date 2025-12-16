import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { VerseCard } from "@/components/verse-card"
import { socialConcerns } from "@/lib/social-concerns-data"
import MinistriesPage from "app/[lang]/app-components/ministries-component"

export default function SocialConcernsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <PageHeader
        title="Social Concerns Ministries"
        subtitle="A group of church members selected annually to lead our social ministries"
      />
      <div className="w-full items-center justify-center px-48 text-gray-700">
        <VerseCard
          reference="James 2:22 (NIV)"
          verse="You see that his faith and his actions were working together, and his faith was made complete by what he did."
        />
        <p className="mb-4">
          The Social Concerns committee in Trinity Methodist Church, Petaling Jaya is a group of church members who have
          been annually selected to provide leadership in the following areas:
        </p>
        <p className="mb-2">1. Coordinating training for social ministries involvement.</p>
        <p className="mb-2">
          2. Participating in consultation programmes and dialogue sessions with NGO’s, churches, government agencies or
          religious bodies.
        </p>
        <p className="mb-2">
          3. Participating in programmes organised by the Board of Social Concerns of the Trinity Annual Conference
          (TRAC).
        </p>
        <p className="mb-2">4. Providing awareness to church members of present social needs in Malaysia.</p>
        <p className="mb-2">
          5. Identifying key social ministries that members can participate in sacrificial services to the honour and
          glory of God.
        </p>
        <p className="mb-2">
          6. Planning the necessary logistics and training for members to participate in short term involvement to bring
          the gospel of Jesus Christ to the communities.
        </p>
        <p className="mb-4">
          7. Equipping the next generation of leaders so that God’s kingdom agenda can become foundations of societal
          transformation.
        </p>
        <p className="mb-4">The Social Concerns Ministries of the church presently cover several areas:</p>
        <p className="mb-2">
          1. Samaritan Ministries which include: Street feeding at YMCA Brickfields, Shekina Centre
        </p>
      </div>
      <MinistriesPage ministries={socialConcerns} />
      <div className="w-full items-center justify-center px-48 text-gray-700">
        <p className="mb-2">2. Children’s Ministries</p>
        <p className="mb-4">
          We have also been assisting several children’s homes and centres for many years. These facilities are managed
          by a few pastors who have the heart for children. We assist only in areas where there is need. In some cases,
          we provide regular assistance to pay utility bills and others help to pay for their meals. What is important
          here is to keep constant contact with them so that when help is needed, we are reachable.
        </p>
        <p className="mb-2">3. Others Needs</p>
        <p>
          Our ministry also provides assistance to other homes such as homes for the aged, AIDS dependants and people
          with disabilities. Such assistance is on a need basis.
        </p>
        <div className="my-8">
          <Separator />
        </div>
        <p className="mb-4">
          Social Concerns Committee provides assistance to those who applied for help. We will conduct due diligence to
          ensure only genuine applicants to receive aid from us. Though this process may be tedious, it helps to confirm
          only the needy are rendered assistance. Article X of the Articles of Religion of the Methodist Church in
          Malaysia states:
        </p>
        <p className="mb-4 font-bold text-red-700 italic">
          “Although good works, which are the fruits of faith, and follow after justification, cannot put away our sins,
          …….. yet are they pleasing and acceptable to God in Christ…..”
        </p>
        <p className="mb-8 font-bold text-red-700 italic">
          We will continue to do His works, showing love and compassion to all, irrespective of race, colour or creed,
          knowing it is pleasing to Him who rules over all.
        </p>
      </div>
      <Footer />
    </div>
  )
}
