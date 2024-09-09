import dotenv from "dotenv"
import ConnectDb from "./src/db/ConnectDb.js"
import {app} from "./src/app.js"

dotenv.config({
    path:'./.env'
})

ConnectDb().then(()=>{
    app.listen(process.env.PORT || 3000,(port)=>{
        console.log('listening on port '+(process.env.PORT || 3000))
    })
}).catch(err=>{

});