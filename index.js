const express = require('express');
const db = require('./config/config');
const routes = require('./routes/index');
const app = express();

db();
app.use(routes);
app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(4000,()=>{
    console.log('Server started @ 4000');
})