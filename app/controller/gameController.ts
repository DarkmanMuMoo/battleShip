
import { JsonController, Get, Post, Param, Put, Delete, Body, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import GameService from "../service/gameService";

@Service()
@JsonController('/game')
export default class GameController {

    constructor(private gameService: GameService) {


    }

    @Get("/:id")
    getOne(@Param("id") id: string) {
        console.log(id);
        return  this.gameService.getOne(id).then(this.mapper);
    }

    @Post()
    create(@Body() gameDTO: BattleShip.GameDTO) {
        let game = this.gameService.generate(gameDTO.name, gameDTO.owner);
        return game.then(this.mapper);
    }

    @Put("/:id/fire")
    fire(@Param("id") id: string, @QueryParam("x") x: number, @QueryParam("y") y: number) {
        return this.gameService.fire(id,[x,y]);
    }

    private mapper = (game: BattleShip.Game) => {
        return {
            id: game.id,
            name: game.name,
            owner: game.owner,
            move:game.move,
            isOver:game.isOver
        }
    }


}