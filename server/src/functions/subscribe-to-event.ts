import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null // user id of the user that invited him. It could be null, if the user is not invited and subscribed directly
}

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  // validate duplicated email
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  // we allow subscribe multiple times, with the same email
  if (subscribers.length > 0) {
    return { subscriberId: subscribers[0].id }
  }

  // using postgres
  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .returning() // to retun the created object

  if (referrerId) {
    // using redis to incremente clicks count
    await redis.zincrby('referral:ranking', 1, referrerId) // it will sort by score
  }

  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}
