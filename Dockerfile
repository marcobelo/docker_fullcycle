FROM golang:1.17-alpine AS builder

RUN mkdir -p /app
WORKDIR /app
COPY . .
ENV CGO_ENABLED=0

RUN go build

FROM scratch

WORKDIR /app

COPY --from=builder /app/main .

ENTRYPOINT [ "./main" ]