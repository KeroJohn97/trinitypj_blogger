import { getDictionary } from "dictionaries"
import GroupsTopicCloud from "../app-components/groups-topic-cloud"
import { getMinistries } from "@/lib/ministries-data"

export default async function MinistriesGroupsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const ministriesData = await getMinistries()

  return <GroupsTopicCloud dict={dict.ministriesGroups} ministries={ministriesData as any} />
}
