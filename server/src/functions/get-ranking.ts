import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

export async function getRanking() {
  // 0-2 => is index based limit of members to return... So it will return the highest 3
  // WITHSCORES => to return not only the member but also the score
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  // return value example for 2 members:
  // ['90326712-9388-442f-bf6b-e1a610dffdd1', '1',
  // '194edf4a-4199-42e5-806f-80053321b313', '1']

  const rankingInformation: Record<string, number> = {}

  // i+=2 => to jump directly to the key(=>id) of each member of the array
  for (let i = 0; i < ranking.length; i += 2) {
    rankingInformation[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(rankingInformation)))

  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: rankingInformation[subscriber.id],
      }
    })
    .sort((sub1, sub2) => sub2.score - sub1.score) // sort score in ascending order

  console.log(rankingWithScore)
  return { rankingWithScore }
}
