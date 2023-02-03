const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = 5000;
// process.env.PORT

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w5yg5ut.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run (){

try{

const appointmentOptionCollection = client.db('doctorPortal').collection('appointmentOptions');

app.get('/appointmentOptions',async(req,res)=>{
   const query ={} 
   const  options = await appointmentOptionCollection.find(query).toArray();
   res.send(options)

})


}




finally{
}

}
run().catch(console.log),










app.get('/',(req,res)=>{
    res.send('hello doctor portal')
})

app.listen(port,()=>{
    console.log(`doctor portal running on port ${port}`)
})