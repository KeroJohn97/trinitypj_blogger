// components/admin/EditorRegistry.tsx
import AboutUsEditor from "components/admin/editors/AboutUsEditor"
import AlphaMediaEditor from "components/admin/editors/AlphaMediaEditor"
import AnnouncementsEditor from "components/admin/editors/AnnouncementsEditor"
import BulletinEditor from "components/admin/editors/BulletinEditor"
import GeneralSettingsEditor from "components/admin/editors/GeneralSettingsEditor"
import GivingEditor from "components/admin/editors/GivingEditor"
import InfographicEditor from "components/admin/editors/InfographicEditor"
import LCECPageEditor from "components/admin/editors/LCECPageEditor"
import PrayerGatheringEditor from "components/admin/editors/PrayerGatheringEditor"
import ServiceTimesEditor from "components/admin/editors/ServiceTimesEditor"
import SmallGroupsEditor from "components/admin/editors/SmallGroupsEditor"
import SpecialAlertsEditor from "components/admin/editors/SpecialAlertsEditor"
import VisionEditor from "components/admin/editors/VisionEditor"
import React from "react"
import LandingNoticesEditor from "./editors/LandingNoticesEditor"
import MediaAssetsEditor from "./editors/MediaAssetsEditor"
import UpcomingActivityEditor from "./editors/UpcomingActivityEditor"
import GroupsEditor from "./editors/GroupsEditor"
import MinistriesEditor from "./editors/MinistriesEditor"

// --- Tab Registry (Easy to expand!) ---
export const EDITOR_COMPONENTS: Record<string, React.FC<any>> = {
  // Brand
  general: (props) => <GeneralSettingsEditor />,
  "landing-notices": () => <LandingNoticesEditor />,
  about: (props) => <AboutUsEditor initialData={props.data?.aboutUsMarkdown} />,
  vision: () => <VisionEditor />,
  "media-assets": () => <MediaAssetsEditor />,
  "lcec-page": () => <LCECPageEditor />,

  // Weekly Pulse
  services: (props) => <ServiceTimesEditor initialData={props.data?.serviceTimes} />,
  alerts: (props) => <SpecialAlertsEditor initialData={props.data?.alert} />,
  bulletin: (props) => <BulletinEditor initialData={props.data?.bulletinUrl} />,
  announcements: () => <AnnouncementsEditor />,
  activities: () => <UpcomingActivityEditor />,

  // Community
  groups: () => <SmallGroupsEditor />,
  "church-groups": () => <GroupsEditor />,
  prayer: () => <PrayerGatheringEditor />,
  ministries: () => <MinistriesEditor />,

  // Resources
  alpha: () => <AlphaMediaEditor />,
  giving: () => <GivingEditor />,
  infographics: (props) => (
    <div className="space-y-8">
      <InfographicEditor title="Ministries" currentUrl={props.data?.infographics?.ministriesUrl} />
      <InfographicEditor title="Fellowships" currentUrl={props.data?.infographics?.groupsUrl} />
    </div>
  ),
}
