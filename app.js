const express=require('express');
const db=require('./utils/db-connection');
const itemsInventryModel=require('./models/itemsInventry');
const itemsInventryRouter=require('./routes/itemsInventryRoutes')
const cors=require('cors');
const app=express();

app.use(cors());

app.use(express.json());

app.use('/items',itemsInventryRouter);

db.sync({force:true}).then(()=>{
    app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
}).catch((err)=>{
    console.log(err)
})

