FROM rust AS builder

WORKDIR /usr/darkmagician/services/imgmap

COPY . .

FROM alpine

COPY --from=builder /usr/darkmagician/services/imgmap /darkmagician-imgmap

RUN cargo build --production

CMD [ "./target/release/imgm" ]
