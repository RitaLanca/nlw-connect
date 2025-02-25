import {
  getSubscriberInviteClicks,
  getSubscriberInviteCount,
  getSubscriberRankingPosition,
} from '@/http/api'
import { BadgeCheck, Medal, MousePointerClick } from 'lucide-react'

interface StatsProps {
  subscriberId: string
}

// because this component is server side rendered, it can be async and use fetch ...

export default async function Stats({ subscriberId }: StatsProps) {
  const { count: linkAccessCount } =
    await getSubscriberInviteClicks(subscriberId)
  const { count: inviteLinksCount } =
    await getSubscriberInviteCount(subscriberId)
  const { position } = await getSubscriberRankingPosition(subscriberId)

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl text-semibold text-gray-200 leading-none">
          {linkAccessCount}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          Acessos ao link
        </span>
        <MousePointerClick className="size-5 text-purple absolute top-3 left-3" />
      </div>
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl text-semibold text-gray-200 leading-none">
          {inviteLinksCount}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          Inscriçoes feitas
        </span>
        <BadgeCheck className="size-5 text-purple absolute top-3 left-3" />
      </div>
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl text-semibold text-gray-200 leading-none">
          {position ? `${position}º` : '-'}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          Acesse o link
        </span>
        <Medal className="size-5 text-purple absolute top-3 left-3" />
      </div>
    </div>
  )
}
