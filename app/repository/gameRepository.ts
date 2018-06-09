
import { Service } from 'typedi';
import { Document, model, Model, Schema } from 'mongoose';
import { BattleShip } from '../../typings'
@Service()
export default class GameRepository {
    private schema = new Schema({
        name: String,
        owner: String,
        isOver: Boolean,
        move: Number,
        field: Array,
        ship: Array
    });
    private model: Model<BattleShip.GameModel> = null;

    constructor() {
        this.model = model<BattleShip.GameModel>('game', this.schema);
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