import { TimelineElement } from "./Timeline.layout"

export const timelineData: TimelineElement[] = [
  {
    id: 1,
    title: "English Sunday Service (evening)",
    date: "5:00pm",
    description: "",
    status: "completed",
  },
  {
    id: 4,
    title: "Methodist Youth Fellowship (MYF)",
    date: "11:00am",
    description: "",
  },
  {
    id: 4,
    title: "Sunday School",
    date: "11:00am",
    description: "",
  },
  {
    id: 2,
    title: "English Sunday Service (morning)",
    date: "9:00am",
    description: "",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Chinese Sunday Service",
    date: "9:00am",
    description: "",
    status: "pending",
  },
]

export type TimelineData = TimelineElement
