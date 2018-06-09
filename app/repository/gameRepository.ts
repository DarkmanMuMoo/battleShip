
import { Service } from 'typedi';
import { Document, model, Model, Schema } from 'mongoose';

export interface GameModel extends BattleShip.Game,Document {}
@Service()
export  class GameRepository {
    private schema = new Schema({
        name: String,
        owner: String,
        isOver: Boolean,
        move: Number,
        field: Array,
        ship: Array
    });
    private model: Model<GameModel> = null;

    constructor() {
        this.model = model<GameModel>('game', this.schema);
    }

    create(game: BattleShip.Game){
        return new this.model(game).save()
    }
    findOne(id) {
        return this.model.findById(id);
    }
    update(id: string, game: BattleShip.Game) {
        return this.model.findByIdAndUpdate(id, game);
    }




}