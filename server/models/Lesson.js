const mongoose = require('mongoose');
const { Schema } = mongoose;

const lessonSchema = new Schema({
    name: String,
    type: String
});

mongoose.model('lessons', lessonSchema);