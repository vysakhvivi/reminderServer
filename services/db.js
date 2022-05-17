const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/reminder',{
    useNewUrlParser:true
})

const User=mongoose.model('User',{
    acno: Number,
    accntname: String,
    pswd: Number, 
    events: []
})

module.exports={
    User
}