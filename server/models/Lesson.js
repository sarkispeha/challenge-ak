const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const lessonSchema = new Schema({
    name: String,
    type: String, //ski, snowboard, sitski
    instructor: {type: String, default: ''}, //volunteer user name
    shadow: {type: String, default: ''}, //volunteer user name
    date: Number,
    createdTimestamp: {type: Number, default: moment().unix() }, //unix
    createdBy: String, //admin user
});

mongoose.model('lessons', lessonSchema);