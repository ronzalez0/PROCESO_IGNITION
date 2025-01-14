const { config } = require('dotenv')
const {connect, connection} = require('mongoose')
const {MONGODB_URI} = require('./config')

const connectDB =async() => {
   await  connect(MONGODB_URI)
   console.log('MongoDB connected')
}

connection.on('error', err => console.log(err))

module.exports={
    connectDB,
    connection
}