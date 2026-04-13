// components/admin/EditorRegistry.tsx
import AboutUsEditor from "components/admin/editors/AboutUsEditor"
import AlphaVideoEditor from "components/admin/editors/AlphaVideoEditor"
import AnnouncementsEditor from "components/admin/editors/AnnouncementsEditor"
import BulletinEditor from "components/admin/editors/BulletinEditor"
import GeneralSettingsEditor from "components/admin/editors/GeneralSettingsEditor"
import GivingEditor from "components/admin/editors/GivingEditor"
import InfographicEditor from "components/admin/editors/InfographicEditor"
import PrayerGatheringEditor from "components/admin/editors/PrayerGatheringEditor"
import ServiceTimesEditor from "components/admin/editors/ServiceTimesEditor"
import SmallGroupsEditor from "components/admin/editors/SmallGroupsEditor"
import SpecialAlertsEditor from "components/admin/editors/SpecialAlertsEditor"
import VisionEditor from "components/admin/editors/VisionEditor"
import React from "react"
import UpcomingActivityEditor from "./editors/UpcomingActivityEditor"
import MediaAssetsEditor from "./editors/MediaAssetsEditor"

// --- Tab Registry (Easy to expand!) ---
export const EDITOR_COMPONENTS: Record<string, React.FC<any>> = {
  // Brand
  general: (props) => <GeneralSettingsEditor />,
  about: (props) => <AboutUsEditor initialData={props.data?.aboutUsMarkdown} />,
  vision: () => <VisionEditor />,
  "media-assets": () => <MediaAssetsEditor />,

  // Weekly Pulse
  services: (props) => <ServiceTimesEditor initialData={props.data?.serviceTimes} />,
  alerts: (props) => <SpecialAlertsEditor initialData={props.data?.alert} />,
  bulletin: (props) => <BulletinEditor initialData={props.data?.bulletinUrl} />,
  announcements: () => <AnnouncementsEditor />,
  activities: () => <UpcomingActivityEditor />,

  // Community
  groups: () => <SmallGroupsEditor />,
  prayer: () => <PrayerGatheringEditor />,

  // Resources
  alpha: () => <AlphaVideoEditor />,
  giving: () => <GivingEditor />,
  infographics: (props) => (
    <div className="space-y-8">
      <InfographicEditor title="Ministries" currentUrl={props.data?.infographics?.ministriesUrl} />
      <InfographicEditor title="Fellowships" currentUrl={props.data?.infographics?.groupsUrl} />
    </div>
  ),
}
