# CRM Project prototype

this is prototye for architecture

## Primary Stack

- Runtime: Node.js (LTS v20+)
- Framework: Fastify
- API Layer: GraphQL (Mercurius) + REST
- Database: PostgreSQL 15+
- ORM: Drizzle ORM
- Auto-CRUD: Pothos GraphQL + Drizzle

## project initialization

1. place all .env files in root file and all modul's rootfile.

   - eg: ./backed/modules.api-gateway/

2. up database service
   if needed change configurations in .env

```shell
   docker compose up -d
```

3. Migrate the db and seeding

```shell
   cd ./backend/modules/user-service/
   npm run db:generate
   npm run db:migrate
   npm run db:seed
```

4. vitilaize the DB using drizzle-kit studio

```shell
   npx drizzle-kit studio
```
## run the project (dev mode)
install depencancies
```shell
   npm ci
```
run (dev)

```shell
   npm run dev
```
> must start all the services + api gateway independantly and acces through only api-gateway \
http://localhost:3000

## Tsting (manual)

[postman workspace](https://crm999-4524.postman.co/workspace/CRM~b3aa2ed9-6146-4325-8b68-009dcd47be53/graphql-request/69541bdab5fe646d1fb08655?action=share&creator=31634810&ctx=documentation)