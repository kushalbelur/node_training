const express=require('express')
const app=express();
const cors=require('cors');
const mongoose=require('mongoose')
const routes=require('./routes/routes')

const dotenv=require('dotenv');
const res = require('express/lib/response');
dotenv.config();

const PORT=process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected succesfully")
}).catch((err)=>{
    res.status(500).json({error:err})
})

app.use(routes);

app.listen(PORT,()=>{
    console.log(`server is up and running @ localhost:${PORT}`)
})