export function mockGame(){
    return  {
        name: 'mock',
        owner: 'owner',
        isOver: false,
        move :0,
        field:[[0,0,0,0],[2,0,0,0],[2,0,1,0],[0,0,0,0]],
        ship :[{
            type:2,
            location:[[1,0],[2,0]],
            isAlive:true
        },{
            type:1,
            location:[[2,2]],
            isAlive:true
        }]
    };
}