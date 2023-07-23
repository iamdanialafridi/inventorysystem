const express = require('express');
const db = require('./config/config');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();


db();
app.use(bodyParser.json());

app.use(routes);
app.get("/",(req,res)=>{
    res.send("Hello world its me");
})

app.listen(4000,()=>{
    console.log('Server started @ 4000');
})