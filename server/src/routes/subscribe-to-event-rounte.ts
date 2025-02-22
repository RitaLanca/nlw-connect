import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

const subscriptionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

// moved routes inside a function to access the app
export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe user to an event',
        tags: ['Subscriptions'],
        body: subscriptionSchema,
      },
    },
    async (req, resply) => {
      const { name, email } = req.body

      return resply.status(201).send({
        name,
        email,
      })
    }
  )
}
