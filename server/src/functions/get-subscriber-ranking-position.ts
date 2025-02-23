import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

// How many invites the user sent
export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  // using redit
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  return { position: rank === null ? null : rank + 1 }
}

export default getSubscriberRankingPosition
