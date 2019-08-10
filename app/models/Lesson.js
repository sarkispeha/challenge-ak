const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const lessonSchema = new Schema({
    studentName: String,
    type: String, //ski, snowboard, sitski
    instructor: {type: String, default: ''}, //volunteer user name
    shadow: {type: String, default: ''}, //volunteer user name
    shadowNecessary: {type: Boolean, default: false},
    date: Number,
    time:{
        AM: {type: Boolean, default: false},
        PM: {type: Boolean, default: false},
        allDay: {type: Boolean, default: false}
    },
    createdTimestamp: {type: Number, default: moment().unix() }, //unix
    createdBy: String, //admin user
});

mongoose.model('lessons', lessonSchema);