import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import getSubscriberInviteClicks from '../functions/get-subscriber-invite-clicks'

const inviteClicksParamsSchema = z.object({
  subscriberId: z.string(),
})

const inviteClicksResponseSchema = z.object({
  count: z.number(),
})

// moved routes inside a function to access the app
export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks count',
          tags: ['referral'],
          params: inviteClicksParamsSchema,
          response: {
            200: inviteClicksResponseSchema,
          },
        },
      },
      async (req, reply) => {
        const { subscriberId } = req.params
        const { count } = await getSubscriberInviteClicks({ subscriberId })
        return { count } // By default the status code is 200
      }
    )
  }
