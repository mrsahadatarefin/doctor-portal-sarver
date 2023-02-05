const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require ('jsonwebtoken')
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
const bookingsCollection = client.db('doctorPortal').collection('bookings');
const usersCollection = client.db('doctorPortal').collection('users');
app.get('/appointmentOptions',async(req,res)=>{
   const data = req.query.data;
   console.log(data)
    const query ={} 
   const  options = await appointmentOptionCollection.find(query).toArray();
   res.send(options)

});

app.get('/bookings',async(req,res)=>{
    console.log(req)
    const email = req.query.email;
    const query = {email:email};
    const bookings = await bookingsCollection.find(query).toArray();
    res.send(bookings)

    console.log(req)
})


app.post('/bookings', async (req,res)=>{
const booking =req.body;
const query ={
    appointmentDate:booking.AppointmentDate
} 
const AlreadyBooked = await bookingsCollection.find(query).toArray()
if(AlreadyBooked.length){
    const message = `you already have a booking on ${booking.appointmentDate}`
    res.send({acknowledged:false,message})
}
const result = await bookingsCollection.insertOne(booking);
res.send(result);
})

app.get('/jwt',async(req,res)=>{
    const email = req.query.email;
    const query= {email:email};
    const user = await usersCollection.findOne(query)
   if(user){
    const token = jwt.sign({email}, process.env.ACCESS_TOKEN,{expiresIn:'1h'})
    return res.send({ACCESS_TOKEN:token});
   }
   
    res.status(403).send({token:""})

})

app.post('/users',async(req,res)=>{
   const user = req.body;
   const result = await usersCollection.insertOne(user)
   res.send(result)

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