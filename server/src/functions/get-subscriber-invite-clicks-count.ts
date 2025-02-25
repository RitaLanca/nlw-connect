import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

interface GetSubscriberInviteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClicksCount({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  // using redit
  const count = await redis.hget('referral:access-count', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}

export default getSubscriberInviteClicksCount
