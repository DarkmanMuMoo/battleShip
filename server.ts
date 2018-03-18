import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import * as express from "express";
import GameController from "./app/controller/gameController";
import env from './app/config/env';
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import { Container } from "typedi";

useContainer(Container);

let app = createExpressServer({
    routePrefix: 'battleShip',
    controllers: [GameController]

});
if (process.env.NODE_ENV != 'test') {
    app.use(morgan('tiny'));
}
export default app;

if (process.env.NODE_ENV != 'test') {
    let port = process.env.PORT || 3000;
    mongoose.connect(env().db).then(() => {
        app.listen(port, () => {
            console.log(`BattleShip listening on port ${port}!`);
        }), console.error
    })
}





