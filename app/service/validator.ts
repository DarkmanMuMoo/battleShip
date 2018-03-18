import { Service } from 'typedi';
import { BadRequestError } from 'routing-controllers';
@Service()
export default class Validator {


    validateGame(game: BattleShip.GameDTO) {


        this.validateString(game.name, 'name must not empty');
        this.validateString(game.owner, 'owner must not empty');


    }

    validateCordinate(x: number, y: number) {
        this.validateExist(x, "x cordinate not defined");
        this.validateExist(y, "y cordinate not defined");
        this.validateLength(x, 0, 9, "x must be between 0-9");
        this.validateLength(y, 0, 9, "y must be between 0-9");
    }

    validateString(value: string, message: string) {
        if (!value || value.length == 0) {
            throw new BadRequestError(message);
        }
    }

    validateExist(value: any, message: string) {
        if (value === null || value === undefined) {
            throw new BadRequestError(message);
        }
    }

    validateLength(value: number, min: number, max: number, message: string) {
        if (value < min || value > max) {
            throw new BadRequestError(message);
        }
    }



}