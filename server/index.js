const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Lesson'); 

mongoose.connect(keys.mongoURI);
const app = express();

require('./routes/core')(app);

const PORT = process.env.PORT || 4000;
console.log('Local Node server listening on port 4000');
app.listen(PORT);