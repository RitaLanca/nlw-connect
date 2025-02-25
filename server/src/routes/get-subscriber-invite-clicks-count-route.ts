import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import getSubscriberInviteClicksCount from '../functions/get-subscriber-invite-clicks-count'

const inviteClicksCountParamsSchema = z.object({
  subscriberId: z.string(),
})

const inviteClicksCountResponseSchema = z.object({
  count: z.number(),
})

// moved routes inside a function to access the app
export const getSubscriberInviteClicksCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks count',
          operationId: 'getSubscriberInviteClicks',
          tags: ['referral'],
          params: inviteClicksCountParamsSchema,
          response: {
            200: inviteClicksCountResponseSchema,
          },
        },
      },
      async (req, reply) => {
        const { subscriberId } = req.params
        const { count } = await getSubscriberInviteClicksCount({ subscriberId })
        return { count } // By default the status code is 200
      }
    )
  }
