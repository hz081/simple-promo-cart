import { validate } from './validation/auth';
import "dotenv/config";
import "reflect-metadata";
import routers from './router';
import _container from "./container";
const Hapi = require('@hapi/hapi');
const Qs = require('qs');
const basicLib = require('@hapi/basic');

const server = Hapi.server({
    port: process.env.HTTP_PORT ? process.env.HTTP_PORT : '4000',
    host: process.env.HTTP_HOST ? process.env.HTTP_HOST : '127.0.0.1',
    query: {
        parser: (query: any) => Qs.parse(query)
    }
});

const init = async () => {
    await server.register(basicLib);
    server.auth.strategy('simple', 'basic', { validate });

    routers.forEach(router => {
        server.route(router);
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
process.on('SIGINT', function () {
    console.log('Stopping the server');
    server.stop({ timeout: 5000 }).then(function (err: Error) {
        console.log('Server stopped');
        process.exit((err) ? 1 : 0);
    })
});

process.on('unhandledRejection', (err) => {
    console.log(err);
});
