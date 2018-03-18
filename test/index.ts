import { Body } from 'routing-controllers';
import * as http from "http";
import * as supertest from "supertest";
import app from '../server';
import env from '../app/config/env';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { mockGame } from './testHelper';
import { model } from 'mongoose';
const baseUrl: string = '/battleShip/game'
let mockgoose: Mockgoose = new Mockgoose(mongoose);

before(function (done) {
    mockgoose.prepareStorage().then(() => {
        let port = process.env.PORT || 3000;
        mongoose.connect(env().db).then(() => {
            app.listen(port, () => {
                console.log(`BattleShip listening on port ${port}!`);
                done();
            }), console.error
        });
    }, () => {
        done();
    });
});
describe('Intregration test ', () => {
    it('should success when create ', done => {
        supertest(app).post(`${baseUrl}`).send({
            name: 'mumoo',
            owner: 'owner'
        }).expect(200).then(response => {
            expect(response.body.id).to.be.exist;
            done();
        }, done)
    });

    it('should  return badRequest send nothing ', done => {
        supertest(app).post(`${baseUrl}`).send({
        }).expect(400, done);
    });

    it('should sucess when get ', done => {
        supertest(app).post(`${baseUrl}`).send({
            name: 'mumoo',
            owner: 'owner'
        }).then(response => {
            let id = response.body.id
            supertest(app).get(`${baseUrl}/${id}`).expect(200);
            done();
        })
    });

    it('it should miss when fire to ocean', done => {

        // mock game 4x4 for testing 
        let gameModel = model<any>('game');
        let mock: any = mockGame();
        new gameModel(mock).save()
            .then(game => game.id)
            .then(id => {
                supertest(app).put(`${baseUrl}/${id}/fire?x=0&&y=0`)
                    .expect(200).then(response => {
                        expect(response.body.status).to.be.eq(0);
                        done();
                    });
            })
    });

    it('it should HIT when fire to target', done => {
        // mock game 4x4 for testing 
        let gameModel = model<any>('game');
        let mock: any = mockGame();
        new gameModel(mock).save()
            .then(game => game.id)
            .then(id => {
                supertest(app).put(`${baseUrl}/${id}/fire?x=1&&y=0`)
                    .expect(200).then(response => {
                        expect(response.body.status).to.be.eq(1);
                        done();
                    })
            })
    });

    it('it should SANK when fire to all of ship part ', done => {
        // mock game 4x4 for testing 
        let gameModel = model<any>('game');
        let mock: any = mockGame();
        new gameModel(mock).save()
            .then(game => game.id)
            .then(id => {
                supertest(app).put(`${baseUrl}/${id}/fire?x=2&&y=2`)
                    .expect(200).then(response => {
                        expect(response.body.status).to.be.eq(2);
                        done();
                    })
            })
    });

    it('it should WIN when fire to all SHIP', done => {
        // mock game 4x4 for testing 
        let gameModel = model<any>('game');
        let mock: any = mockGame();
        new gameModel(mock).save()
            .then(game => game.id)
            .then(id => {
                supertest(app).put(`${baseUrl}/${id}/fire?x=1&&y=0`).expect(200)
                    .then(() => supertest(app).put(`${baseUrl}/${id}/fire?x=2&&y=0`).expect(200))
                    .then(() => supertest(app).put(`${baseUrl}/${id}/fire?x=2&&y=2`).expect(200))
                    .then(response => {
                        expect(response.body.status).to.be.eq(3);
                        done();
                    })
            })
    });


});


