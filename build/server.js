"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const app = routing_controllers_1.createExpressServer();
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`BattleShip listening on port ${port}!`);
});
//# sourceMappingURL=server.js.map