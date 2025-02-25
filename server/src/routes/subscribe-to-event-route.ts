import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

const subscriptionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  referrerId: z.string().nullish(), // user id of the user that invited him. It could be null, if the user is not invited and subscribed directly
})

const subscriptionResponseSchema = z.object({
  subscriberId: z.string(),
})

// moved routes inside a function to access the app
export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe user to an event',
        operationId: 'subscribeToEvent',
        tags: ['subscription'],
        body: subscriptionSchema,
        response: {
          201: subscriptionResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const { name, email, referrerId } = req.body
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId,
      })
      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
