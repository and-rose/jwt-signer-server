#!/bin/bash

JWT_PAYLOAD='{ "sub": "1234567890", "name": "John Doe" }'

curl -v http://localhost:3000/sign \
  -H "Content-Type: application/json" \
  -d "$JWT_PAYLOAD"
