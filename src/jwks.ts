import { JWTPayload, SignJWT, exportJWK, generateKeyPair } from 'jose'
import { randomBytes } from 'node:crypto'
import { issuer } from './config.js'

const { publicKey, privateKey } = await generateKeyPair('RS256')
const jwk = {
  ...(await exportJWK(publicKey)),
  kid: randomBytes(16).toString('base64url'),
  use: 'sig',
  alg: 'RS256',
}

const createJwt = async (payload: JWTPayload) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT', kid: jwk.kid })
    .setExpirationTime('1h')
    .setIssuer(issuer)
    .setIssuedAt()
    .sign(privateKey)

  return jwt
}

export { createJwt, jwk }
