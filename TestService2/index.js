const { urlencoded } = require('express');
const cors=require('cors');
const express=require('express');
const app=express();

app.use(express.json(urlencoded({extended:true})));
app.use(cors({allowedHeaders:'*',origin:'*',optionsSuccessStatus:200}));

app.get("/",(req,res)=>{
    res.status(200).json({"msg":"Welcome to TestService 2"});
});

app.post("/test2",(req,res)=>{
    const input=req.body.data;
    console.log(input);
    res.status(200).json({"msg":`Your unique code is :- ${input.code}`});
});

app.listen(3001,()=>{console.log("Service is up and running at Port: 3001")});

