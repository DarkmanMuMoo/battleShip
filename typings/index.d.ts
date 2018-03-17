
declare namespace BattleShip {

    interface GameDTO {
        id?:string;
        name: string;
        owner: string;
    }

    interface Game {
        id?:string;
        name: string;
        owner: string;
        isOver: boolean;
        move :number;
        field:any[][];
        ship :Ship[];
    }
   
    enum ShipType{
        BattleShip=4,
        Cruisers=3,
        Destroyers=2,
        Submarines=1
    }
    enum FireStatus{
        MISSED=0,
        HIT=1,
        SANK=2,
        WIN=3
    }
    interface Ship{
        type:ShipType;
        location:number[];
        isAlive:boolean;
    }
    interface Result{
       status:FireStatus;
       message:string;
    }
}
