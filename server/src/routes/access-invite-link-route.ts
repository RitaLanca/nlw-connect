import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env-var'
import { acessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

const accessInviteParamsSchema = z.object({
  subscriberId: z.string(),
})

const subscriptionResponseSchema = z.object({
  id: z.string(),
})

// moved routes inside a function to access the app
export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access and count invite link and redirects user',
        tags: ['referral'],
        params: accessInviteParamsSchema,
        response: {
          201: subscriptionResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const { subscriberId } = req.params
      await acessInviteLink({ subscriberId })
      // console.log(await redis.hgetall('referral:access-count')) // to get all the values

      const redirectUrl = new URL(env.WEB_URL)
      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302) // diference 301 and 302: 301 is permanent (cached) , 302 is temporary (not cached). So each time link is accessed, the click is counted
    }
  )
}
