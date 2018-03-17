import "reflect-metadata";
import { createExpressServer,useContainer } from "routing-controllers";
import * as express from "express";
import GameController from "./app/controller/gameController";
import env from './app/config/env';
import * as mongoose from "mongoose";
import {Container} from "typedi";

useContainer(Container);

let app = createExpressServer({
    routePrefix: 'battleShip',
    controllers: [GameController] 
    
});
let port = process.env.PORT || 3000;
mongoose.connect(env().db).then(()=>{
    app.listen(port, () => {
        console.log(`BattleShip listening on port ${port}!`);
    }),console.error
})
  

