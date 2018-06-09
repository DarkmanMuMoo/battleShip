
import { JsonController, Get, Post, Param, Put, Body, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { GameService } from "../service/gameService";
import Validator from "../service/validator";
import { BattleShip } from '../../typings'
@Service()
@JsonController('/game')
export default class GameController {

    constructor(private gameService: GameService, private validator: Validator) {
    }

    @Get("/:id")
    getOne(@Param("id") id: string) {
        return this.gameService.getOne(id).then(this.mapper);
    }

    @Post()
    create(@Body() gameDTO: BattleShip.GameDTO) {
        this.validator.validateGame(gameDTO);
        let game = this.gameService.generate(gameDTO.name, gameDTO.owner);
        return game.then(this.mapper);
    }

    @Put("/:id/fire")
    fire(@Param("id") id: string, @QueryParam("x") x: number, @QueryParam("y") y: number) {
        this.validator.validateCordinate(x, y);
        return this.gameService.fire(id, [x, y]);
    }

    private mapper = (game: BattleShip.GameModel) => {
        return {
            id: game.id,
            name: game.name,
            owner: game.owner,
            move: game.move,
            isOver: game.isOver
        }
    }


}