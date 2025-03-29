#!/bin/bash

JWT_PAYLOAD='{ "sub": "1234567890", "name": "John Doe" }'

curl -v http://localhost:5601/sign \
  -H "Content-Type: application/json" \
  -d "$JWT_PAYLOAD"
