<!-- markdownlint-disable MD024 -->

# Valkyrie Test Auth Server

This is a simple Fastify API designed to sign and verify JSON Web Tokens (JWT).
It allows you to create JWTs with custom payloads and redirect verifiers to
itself on localhost. This project is intended to be run inside a container to
aid testing efforts.

## Features

1. **Sign JWTs:** Create a JWT with a custom payload
2. **Verify JWTs:** Host public keys for asymmetric verification

## Prerequisites

1. Docker (for running the container)
2. Node.js
3. pnpm

## Installation

### Running with Docker

If you plan on hosting the jwt-signer on a port other than 3000, you will need
to specify a customer issuer url to encode inside emitted JWTs.

```sh
docker run -p 5601:3000 -e ISSUER="http://localhost:5601" jwt-signer
```

### Running Locally (without Docker)

1. Clone the repository

   ```sh
   git clone <repository-url>
   cd <repository-path>
   ```

2. Install dependencies

   ```sh
   pnpm i
   ```

3. Run the API

   ```sh
   pnpm dev
   ```

## API Endpoints

### POST /sign

Sign a custom payload and return a JWT.

#### Request Body

```jsonc
{
  // Any claims are valid
  "sub": "u123456",
  "custom_claim": "custom_value",
  "cloud_superAdmin": true,
}
```

#### Response

```jsonc
{
  "jwt": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
}
```

### GET /.well-known/jwks.json

Retrieves the JSON Web Key Set (JWKS) used for verifying JWTs. You can expect
your authentication library/middleware to invoke this.

#### Response

```jsonc
{
  "keys": [
    {
      "kty": "RSA",
      "kid": "1234",
      "use": "sig",
      "alg": "RS256",
      "n": "base64-modulus",
      "e": "AQAB",
    },
  ],
}
```

## Integrating with your System

Configure the system-under-test to use this project's address as an authority.
