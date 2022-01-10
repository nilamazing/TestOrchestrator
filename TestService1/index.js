const { urlencoded } = require('express');
const cors=require('cors');
const express=require('express');
const app=express();

app.use(express.json(urlencoded({extended:true})));
app.use(cors({allowedHeaders:'*',origin:'*',optionsSuccessStatus:200}));

app.get("/",(req,res)=>{
    res.status(200).json({"msg":"Welcome to TestService 1"});
});

app.post("/test1",(req,res)=>{
    const input=req.body.data;
    let r = (Math.random() + 1).toString(36).substring(7);
    res.status(200).json({"msg":`${r}`});
});

app.listen(3000,()=>{console.log("Service is up and running at Port: 3000")});

