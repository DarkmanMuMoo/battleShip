import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import * as express from "express";
import GameController from "./app/controller/gameController"
let app = createExpressServer( {
    routePrefix:'battleShip',
    controllers: [GameController] // register controllers routes in our express app
});
let port = process.env.PORT || 3000;  
app.listen(port, () => {
    console.log(`BattleShip listening on port ${port}!`);
});