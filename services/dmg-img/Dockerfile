FROM rust:1.44-alpine AS builder

WORKDIR /usr/darkmagician/dmg-img

COPY . .

FROM alpine

COPY --from=builder /usr/darkmagician/dmg-img /darkmagician/services/image-manip

RUN apk add rust git
RUN cargo build --production

CMD [ "./target/release/dmg-img" ]
