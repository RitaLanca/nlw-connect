import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

interface getSubscriberInviteCountParams {
  subscriberId: string
}

// How many invites the user sent
export async function getSubscriberInviteCount({
  subscriberId,
}: getSubscriberInviteCountParams) {
  // using redit
  const count = await redis.zscore('referral:ranking', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}

export default getSubscriberInviteCount
