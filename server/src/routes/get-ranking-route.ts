import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'
import getSubscriberInviteClicks from '../functions/get-subscriber-invite-clicks'

const inviteClicksParamsSchema = z.object({
  subscriberId: z.string(),
})

const subscriberSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number(),
})

const getRankingResponseSchema = z.object({
  ranking: z.array(subscriberSchema),
})

// moved routes inside a function to access the app
export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get subscriber invite clicks count',
        tags: ['referral'],
        response: {
          200: getRankingResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const { rankingWithScore } = await getRanking()
      return { ranking: rankingWithScore }
    }
  )
}
