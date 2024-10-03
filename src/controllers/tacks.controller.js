const Can = require('../models/tacks')
const {connection} = require('../db')

const addCliente = async(can) => {
     //console.log(can)
     await Can.create(can)
     console.log('Cliente insertado')
     await connection.close()
}

module.exports={
    addCliente,
}