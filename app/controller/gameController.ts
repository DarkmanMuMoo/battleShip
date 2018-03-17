
import { JsonController, Get, Post, Param, Put,Delete, Body ,QueryParam } from "routing-controllers";

@JsonController('/game')
export default class GameController {

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return {
            id
        }
    }

    @Post()
    create(@Body() game: BattleShip.GameDTO) {
        return {
            name: game.name,
            owner: game.owner
        };
    }

    @Put("/:id/fire")
    fire(@Param("id") id: number,@QueryParam("x") x: number,@QueryParam("y") y: number){
            console.log(id);
            console.log(x);
            console.log(y);
            return{};
    }


}