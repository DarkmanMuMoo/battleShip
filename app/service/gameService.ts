import generator from './gameGenerator'
import { Service } from "typedi";
import GameRepository from '../repository/gameRepository';
@Service()
export default class GameService {

    constructor(private gameRepository: GameRepository) {

    }
    generate(name, owner): Promise<BattleShip.Game> {
        let game: BattleShip.Game = generator(name, owner);
        console.log(game);
        return this.gameRepository.create(game);
    }

    getOne(id: string): Promise<BattleShip.Game> {
        return this.gameRepository.findOne(id).then(game => game);
    }

    fire(id: string, cordinate: number[]) : Promise<BattleShip.Result> {
        return this.getOne(id).then(game => this.process(game, cordinate));
    }

    private process(game: BattleShip.Game, cordinate: number[]): Promise<BattleShip.Result> {

        let space = game.field[cordinate[0]][cordinate[1]];
        let result: BattleShip.Result = null;
        game.move++;
        if (space == 0 || space == -1) {
            result = {
                status: BattleShip.FireStatus.MISSED,
                message: 'Miss'
            }
        } else {
            // it was Hit !!
            game.field[cordinate[0]][cordinate[1]] = -1;
            let ship = this.getShip(game, cordinate);
            ship.location = ship.location.filter(c => c[0] == cordinate[0] && c[1] == cordinate[1]);
            ship.isAlive = ship.location.length > 0;

            if (this.isAllShipSank(game)) {
                game.isOver = true;
                result = {
                    status: BattleShip.FireStatus.WIN,
                    message: `Win !  You completed the game in ${game.move} moves Hit 20  times missed ${game.move - 20}`
                }
            } else if (ship.isAlive) {
                result = {
                    status: BattleShip.FireStatus.HIT,
                    message: `HIT`
                }
            } else {
                result = {
                    status: BattleShip.FireStatus.WIN,
                    message: `You just sank the ${BattleShip.ShipType[ship.type]}`
                }
            }

            return this.gameRepository.update(game.id, game)
                .then(() => result);
        }

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