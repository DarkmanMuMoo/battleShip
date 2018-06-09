

  namespace BattleShip {

    export interface Game {
        name: string;
        owner: string;
        isOver: boolean;
        move: number;
        field: any[][];
        ship: Ship[];
    }

    
    export interface GameDTO {
        id?: string;
        name: string;
        owner: string;
    }
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
    export interface Ship {
        type: ShipType;
        location: number[];
        isAlive: boolean;
    }
    export interface Result {
        status: FireStatus;
        message: string;
    }
}
