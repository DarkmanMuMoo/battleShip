
import generator from './gameGenerator'
import { Service } from "typedi";
import GameRepository from '../repository/gameRepository';
import { ForbiddenError, NotFoundError } from 'routing-controllers';
import { BattleShip}  from "../../typings"
export enum ShipType {
    BattleShip = 4,
    Cruisers = 3,
    Destroyers = 2,
    Submarines = 1
}

export enum FireStatus {
    MISSED = 0,
    HIT = 1,
    SANK = 2,
    WIN = 3
}
@Service()

export  class GameService {

    private static GAME_NOT_EXIST: string = 'game not exist';
    private static GAME_OVER: string = 'game is over';
    constructor(private gameRepository: GameRepository) {

    }
    generate(name, owner): Promise<BattleShip.Game> {
        let game: BattleShip.Game = generator(name, owner);
        this.printBoard(game.field);
        return this.gameRepository.create(game);
    }

    getOne(id: string): Promise<BattleShip.GameModel> {
        return this.gameRepository.findOne(id).then(game => {
            if (!game) {
                throw new NotFoundError(GameService.GAME_NOT_EXIST);
            }
            return game;
        });
    }

    fire(id: string, cordinate: number[]): Promise<BattleShip.Result> {
        return this.getOne(id).then(game => {
            if (!game) {
                throw new NotFoundError(GameService.GAME_NOT_EXIST);
            }
            if (game.isOver) {
                throw new ForbiddenError(GameService.GAME_OVER);
            }
            return game;
        }).then(game => this.process(game, cordinate));
    }
    private isSpaceEmptyOrGotHit(space:number){
       return space == 0 || space == -1;
    }
    private process(game: BattleShip.GameModel, cordinate: number[]): Promise<BattleShip.Result> {

        let space = game.field[cordinate[0]][cordinate[1]];
        let result: BattleShip.Result = null;
        game.move++;
        if (this.isSpaceEmptyOrGotHit(space)) {
            result = {
                status: FireStatus.MISSED,
                message: 'Miss'
            }
        } else {
            // it was Hit !!
            game.field[cordinate[0]][cordinate[1]] = -1;
            let ship = this.getShip(game, cordinate);
            let otherCordinate = c => !(c[0] == cordinate[0] && c[1] == cordinate[1])
            ship.location = ship.location.filter(otherCordinate);
            ship.isAlive = ship.location.length > 0;
            if (this.isAllShipSank(game)) {
                game.isOver = true;
                result = {
                    status: FireStatus.WIN,
                    message: `Win !  You completed the game in ${game.move} moves Hit 20  times missed ${game.move - 20}`
                }
            } else if (ship.isAlive) {
                result = {
                    status: FireStatus.HIT,
                    message: `HIT`
                }
            } else {
                result = {
                    status: FireStatus.SANK,
                    message: `You just sank the ${ShipType[ship.type]}`
                }
            }
        }
        return this.gameRepository.update(game.id, game)
            .then(() => result);

    }

    private isAllShipSank(game: BattleShip.Game): boolean {
        return game.ship.filter(ship => ship.isAlive).length == 0;
    }
    private getShip(game: BattleShip.Game, cordinate: number[]): BattleShip.Ship {
        return game.ship.find(ship => !!ship.location.find(c => c[0] == cordinate[0] && c[1] == cordinate[1])
        );
    }

    private printBoard(game) {
        let result = ''
        for (let i = 9; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                result += `| ${game[j][i]} |`;
            }
            result += '\n';
        }
        console.log(result);
    }
}