import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriberId: string
}

export async function acessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  // using redit
  await redis.hincrby('referral:access-count', subscriberId, 1)
}

// if subscriberId = 123
// {'123': x } -> {'123': x + 1}  -> {'123': x + 1} Each time the function is called the value is incremented by 1
