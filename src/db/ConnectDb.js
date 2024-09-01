import mongoose from "mongoose"

export const ConnectDb = async()=>{
 try {
       const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`,{
           writeConcern: { w: 'majority' },
           dbName: process.env.DB_NAME,  // Specify the database name here
          })
       return 'connected'
 } catch (error) {
console.log(`Error connecting to ${process.env.DB_URL}`, error)
    process.exit(1)
    
 }

}

export default ConnectDb