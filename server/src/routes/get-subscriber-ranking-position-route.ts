import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import getSubscriberRankingPosition from '../functions/get-subscriber-ranking-position'

const rankingPositionParamsSchema = z.object({
  subscriberId: z.string(),
})

const rankingPositionResponseSchema = z.object({
  position: z.number().nullable(),
})

// moved routes inside a function to access the app
export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['referral'],
          params: rankingPositionParamsSchema,
          response: {
            200: rankingPositionResponseSchema,
          },
        },
      },
      async (req, reply) => {
        const { subscriberId } = req.params
        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })
        return { position } // By default the status code is 200
      }
    )
  }
