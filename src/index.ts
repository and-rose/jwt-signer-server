import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { port } from './config.js'
import { jwtEndpoints } from './endpoints.js'

const fastify = Fastify({ logger: true })

await fastify.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'JWT Signer API',
      version: '1.0.0',
      description: 'Exclusively for testing purposes. Not for production use.',
    },
  },
})

await fastify.register(swaggerUi, {
  routePrefix: '/swagger',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  staticCSP: true,
})

await fastify.register(jwtEndpoints)

fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
