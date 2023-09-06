import { FC } from "react"
import { RecentActivityItem } from "."

const RecentActivityList: FC = () => {
  return (
    <ul className="flex flex-col gap-4">
      <li>
        <RecentActivityItem linkText="web dev" />
      </li>
      <li>
        <RecentActivityItem linkText="web dev" />
      </li>
      <li>
        <RecentActivityItem linkText="web dev" />
      </li>
    </ul>
  )
}

export { RecentActivityList }
