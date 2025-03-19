import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSubscriberInviteClicksCountRoute } from './routes/get-subscriber-invite-clicks-count-route'
import { getSubscriberInviteCountsRoute } from './routes/get-subscriber-invite-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Allow automatc validation
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Allow CORS
app.register(fastifyCors)

// Swagger config
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect API',
      version: '0.1.0',
    },
  },
  transform: jsonSchemaTransform, // does the integration of the zod schema to documentation
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs', // path to your api docs: http://localhost:3333/docs
})

// register routes --- and pass the app to the routes

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksCountRoute)
app.register(getSubscriberInviteCountsRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})
