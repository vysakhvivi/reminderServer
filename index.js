const express=require('express')
const app=express()

const cors=require('cors')



app.listen(3000,()=>{
    console.log("The server is working at port 3000");
})

app.get('/',(req,res)=>{
    res.send("Get Request")
})

const dataservice= require('./services/data.service')

app.use(cors({
    origin:'http://localhost:4200'
}))

app.use(express.json())


app.post('/register',(req,res)=>{
    dataservice.register(req.body.acno,req.body.pswd,req.body.accntname)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    
})

app.post('/login',(req,res)=>{
    dataservice.login(req.body.acno,req.body.pswd)
    .then(result=>{
    res.status(result.statuscode).json(result)
    })
})

app.post('/dashboard',(req,res)=>{
    dataservice.addevent(req.body.acno,req.body.date,req.body.des,req.body.uid)
    .then(result=>{
     res.status(result.statuscode).json(result)
 })
 })

 app.post('/eventform',(req,res)=>{
    dataservice.events(req.body.acno)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

app.delete('/ondelete/:acno',(req,res)=>{
    dataservice.deleteacc(req.params.acno)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

app.get('/updateform/:i',(req,res)=>{
    dataservice.getcurrentdata(req.params.i)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

app.delete('/deletedata/:i',(req,res)=>{
    dataservice.deletedata(req.params.i)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

// app.updateevent('/updateform',(req,res)=>{
//     dataservice.updateform(req.body.events.date,req.body.events.des,req.body.events.uid)
//     console.log(req.body.events.uid)
//     .then(result=>{
//         res.status(result.statuscode).json(result)
//     })
// })




