import mongoose, { Mongoose } from "mongoose";

const athleteSchema = new mongoose.Schema({
    id: {
        type: String,
        description: 'the id of athelete generate by mongodb',
        required: false
    },
    idUSer: {
        idUSer: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstname: {
        type: String,
        description: 'first name of the athlete',
        required: true
    },
    lastname: {
        type: String,
        description: 'lastname of the athlete',
        required: true
    },
    birthday: {
        type: String,
        description: 'birthday of the athlete',
        required: true
    }

})

export const ATHLETE_PUBLIC_FIELDS = '_id firstname lastname birthday';

mongoose.model('Athlete', athleteSchema)