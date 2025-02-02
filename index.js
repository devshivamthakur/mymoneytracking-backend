import dotenv from "dotenv"
import ConnectDb from "./src/db/ConnectDb.js"
import {app} from "./src/app.js"
import cluster from "cluster"
import os from "os"

const numCPUs = os.cpus().length;

dotenv.config({
    path:'./.env'
})

// if(cluster.isPrimary){
//     console.log(`Primary ${process.pid} is running`);
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         // console.log(`worker ${worker.process.pid} died`);
//       });

// }else{
    
// }
ConnectDb().then(()=>{
    app.listen(process.env.PORT || 3000,(port)=>{
        console.log('listening on port '+(process.env.PORT || 3000))
        console.log('API documentation is available at http://localhost:3000/api-docs');

    })
}).catch(err=>{

});
