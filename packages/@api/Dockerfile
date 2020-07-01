FROM node:13-alpine AS builder

WORKDIR /usr/darkmagician/api

COPY . .

FROM alpine

COPY --from=builder /usr/darkmagician/api /darkmagician-api/

RUN apk add nodejs npm git
RUN \
  npm install \
  npm run build

CMD [ "node", "build/src/index.js" ]

