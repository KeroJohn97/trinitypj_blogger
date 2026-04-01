import { getDictionary } from "dictionaries"
import GroupsTopicCloud from "../app-components/groups-topic-cloud"

export default async function MinistriesGroupsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  return <GroupsTopicCloud dict={dict.ministriesGroups} />
}
