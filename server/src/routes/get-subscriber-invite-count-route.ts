import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import getSubscriberInviteCount from '../functions/get-subscriber-invites-count'

const inviteCountParamsSchema = z.object({
  subscriberId: z.string(),
})

const inviteCountResponseSchema = z.object({
  count: z.number(),
})

// moved routes inside a function to access the app
export const getSubscriberInviteCountsRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber invite count',
          operationId: 'getSubscriberInviteCount',
          tags: ['referral'],
          params: inviteCountParamsSchema,
          response: {
            200: inviteCountResponseSchema,
          },
        },
      },
      async (req, reply) => {
        const { subscriberId } = req.params
        const { count } = await getSubscriberInviteCount({ subscriberId })
        return { count } // By default the status code is 200
      }
    )
  }
