const { Schema, model } =require('mongoose')

const taskSchema = new Schema({
    unit_id: {type: String},
    speed: {type: String},
    mileage:  {type:String},
    last_update:  {type:String},
    ignition_total_time:  {type:String},
    state: {
                    name: {type:String},
                    start: {type:String},
                    duration: {type:String}                   
           },
    movement_state: {
                    name: {type:String},
                    start: {type:String},
                    duration: {type:String}
    },
    fuel_type: {type:String},
    avg_fuel_consumption: {
                    norm: {type:String},
                    measurement: {type:String}
    } 

},{
    timestamps:true,
    versionKey:false
}) 

/*const taskSchema = new Schema({
    "unit_id": String,
    "lat": String,
    "lng": String,    
    "speed": String,
    "mileage": String,
    "last_update": String,
    "ignition_total_time": String
   },{
            timestamps:true,
            versionKey:false
    }) */

module.exports = model('can',taskSchema)
