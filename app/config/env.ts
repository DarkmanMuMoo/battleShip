export default function():any{
    return {
          db: process.env.db || `mongodb://battleShip:123@localhost:27017/battleShip`
    }
}