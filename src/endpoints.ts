import { FastifyInstance } from 'fastify'
import { createJwt, jwk } from './jwks.js'

interface JwtPayload {
  sub: string
  [key: string]: any
}

export async function jwtEndpoints(fastify: FastifyInstance) {
  // Route to sign a JWT
  fastify.post<{ Body: JwtPayload }>(
    '/sign',
    {
      schema: {
        summary: 'Submit a custom payload to sign',
        description: 'Sign a JWT with a custom payload',
        body: {
          type: 'object',
          description: 'Payload to sign',
          properties: {
            sub: { type: 'string' },
            name: { type: 'string' },
          },
          additionalProperties: true,
          examples: [
            {
              sub: '1234567890',
              name: 'John Doe',
              extraClaim: 'extraValue',
            },
          ],
        },
        response: {
          200: {
            type: 'object',
            description: 'Signed JWT',
            properties: {
              jwt: { type: 'string' },
            },
            examples: [
              {
                jwt: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
              },
            ],
          },
          400: {
            type: 'object',
            description: 'Bad Request',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
            },
            examples: [
              {
                error: 'Invalid payload format',
              },
            ],
          },
        },
      },
    },
    async (request, reply) => {
      const payload = request.body

      const jwt = await createJwt(payload)

      return reply.status(200).send({ jwt })
    },
  )

  // Host public key for verification under .well-known
  fastify.get(
    '/.well-known/jwks.json',
    {
      schema: {
        summary: 'Verify JWTs using public key',
        description:
          'Public key for verifying JWTs. Use this endpoint to retrieve the public key.',
        response: {
          200: {
            description: 'JWK Set',
            type: 'object',
            properties: {
              keys: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    kty: { type: 'string' },
                    use: { type: 'string' },
                    kid: { type: 'string' },
                    alg: { type: 'string' },
                    n: { type: 'string' },
                    e: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({
        keys: [jwk],
      })
    },
  )
}
