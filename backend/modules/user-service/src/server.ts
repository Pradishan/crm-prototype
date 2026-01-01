import Fastify from 'fastify'
import mercurius from 'mercurius'
import { schema } from './graphql/schema'
import { userRoutes } from './rest/user.routes'
import { env } from './util/env'

const app = Fastify({logger: env.LOG})

app.register(mercurius, {
    schema,
    graphiql: true,
    context: (req) => ({
        userId: req.headers['x-user-id'],
        roleId: req.headers['x-user-role'],
    })
})

app.register(userRoutes)

const start = async () => {
    try {
        await app.listen({ port: env.PORT, host: env.HOST });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start()