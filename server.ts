import "reflect-metadata";
import {createExpressServer, useExpressServer} from "routing-controllers";
const app = createExpressServer();
let port = process.env.PORT || 3000;  
app.listen(port, () => {
    console.log(`BattleShip listening on port ${port}!`);
});