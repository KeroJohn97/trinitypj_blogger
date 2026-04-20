import { getDictionary } from "dictionaries"
import GroupsTopicCloud from "../app-components/groups-topic-cloud"
import { ministryService } from "@/services/ministry-service"
import { groupService } from "@/services/group-service"

export default async function MinistriesGroupsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  
  // Fetch dynamic data from database
  const [ministries, groups] = await Promise.all([
    ministryService.getAll(),
    groupService.getAll()
  ])

  return (
    <GroupsTopicCloud 
      dict={dict.ministriesGroups} 
      ministries={ministries} 
      groupsData={groups} 
    />
  )
}
