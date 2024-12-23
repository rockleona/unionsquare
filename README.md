# UnionSquare
[toc]

## Assumption

1. To create an internal peer review system
2. User role have: admin, employee
3. User can create their own account
4. Admin will review all the employees; Employee will review other employees as admin requested

### Ideal Document Model

```json
{
    username: 'string',
    role: 'string, enum',
    password: 'string, hashed',
    reviews:{
        review: 'string',
        reviewer: 'string',
        rate: 'integer',
        feedback: 'string'
    }
}
```

### User Collection Permission
| Operation\Role | Admin | Employee       |
| -------------- | ----- | -------------- |
| Create         | ✅     | ✅              |
| Read           | ✅     | ✅  (Only self) |
| Update         | ✅     | ✅              |
| Delete         | ✅     |                |


## Host the project locally

### Getting Started
```sh
corepack enable pnpm
pnpm install
```

### Start the service
```sh
docker network create us_network
docker compose -f dev-docker-compose.yml build
docker compose -f dev-docker-compose.yml up
```

### Preview the website

```sh
open http://localhost:3000
```

### Inspect MongoDB

```sh
open http://localhost:8081
```