"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const gameController_1 = require("./app/controller/gameController");
let app = routing_controllers_1.createExpressServer({
    routePrefix: 'battleShip',
    controllers: [gameController_1.default] // register controllers routes in our express app
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`BattleShip listening on port ${port}!`);
});
//# sourceMappingURL=server.js.map