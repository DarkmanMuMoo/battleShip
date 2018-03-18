# Stack
- Typescript
- Express
- MongoDB 
- Nodejs (version 8.x)

# API SPECIFICATION
   - ### Create game 
 ```
   POST /battleShip/game 

   REQUEST: {
     name:'mumoo-game',
     owner:'mumoo'
   }

   RESPONSE: {
     id:'5aad710bee013f15244aeba5',
     name:'mumoo-game',
     owner:'mumoo'
   }

```
   - ### get game info 
```
   GET /battleShip/game/${id} 
   RESPONSE {
     id:'5aad710bee013f15244aeba5',
     name:'mumoo-game',
     owner:'mumoo',
     move:0,
     isOver:false
   }
```
   - ### play game  
   status and message return according from requirement 
        MISSED=0,
        HIT=1,
        SANK=2,
        WIN=3
```
   GET /battleShip/game/${id}/fire?x=${x}&&y=${y} 
   RESPONSE {
      status:0
      message:'MISS'
   }
```


   - ### Create game 
 ```
   POST /battleShip/game 
   PARAM {
     name:'mumoo-game',
     owner:'mumoo'
   }
```

# How to run 

- ### with Docker
   I setup everything in docker already. all you need is just 
```
  docker-compose up
```
- ### manually 
   prepare mongoDB by your self and provide db url in db enviroment  
```
  npm run build 
  node db=${your url here} ./build/server.js
```

# How to test 
    The test run with mocha.
```
  npm test
```

  


    