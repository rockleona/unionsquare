# UnionSquare

## Getting Started

```sh
docker network create us_network
docker compose -f dev-docker-compose.yml build
docker compose -f dev-docker-compose.yml up
```

## Preview the website

```sh
open http://localhost:3000
```

## Inspect MongoDB

```sh
open http://localhost:8081
```