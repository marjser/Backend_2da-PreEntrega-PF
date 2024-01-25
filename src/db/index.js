const mongoose = require('mongoose')



const mongoConnect = async () =>{
    try {
        await mongoose.connect('mongodb+srv://marianojser:hzbEFRg2eLWZc6JB@cluster0.fhigflh.mongodb.net/ecommerce_2da-PreEntrega?retryWrites=true&w=majority')
        console.log('DB is connnected')
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = mongoConnect