import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema({
    id: {
        type: String,
        description: 'the id of the competition generate by mongodb',
        required: false
    },
    name: {
        type: String,
        description: 'name of competition',
        required: true,
    },
    location: {
        type: String,
        description: 'location of the competition',
        required: true
    },
    datetime: {
        type: String,
        descritpion: 'datetime of the competition',
        required: true
    },
    indoor: {
        type: Boolean,
        decription: 'if is an indoor competition (pool) or not'
    },
    poolLength:{
        type: Number,
        description: 'length of the pool if the type of competiton is indoor'
    },
    times:[
        {
            id: {
                type: String,
                description: 'the id of the time generate by mongodb',
                required: false
            },
           athlete: {
            idAthelete: mongoose.Schema.Types.ObjectId,
            ref: 'Athlete',
            required: true
           },
           test: {
            type: String,
            description: 'the name of the test',
            required: true
           },
           playoffs: {
            type: String,
            description: "is used to determine whether it is a playoff, quarter-half or final."
           },
           laps: [
            {
                id: {
                    type: String,
                    description: 'the id of the lap generate by mongodb',
                    required: false
                },
                time:{
                    type: String,
                    description: 'time of the lap',
                    required: true
                }
            }
           ]    
        }
    ]
})

mongoose.model('Competition', competitionSchema)