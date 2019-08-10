const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const userSchema = new Schema({
    externalId: String,
    username: String,
    role: String,
    email: String,
    volunteerHours: {type: Number, default: 0},
    isDeleted: { type: Boolean, default: false},
    createdTimestamp: {type: Number, default: moment().unix() } //unix
});

mongoose.model('users', userSchema);