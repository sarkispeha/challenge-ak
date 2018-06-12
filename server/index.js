const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Lesson'); 

mongoose.connect(keys.mongoURI);
const app = express();

require('./routes/core')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;
console.log('Local Node server listening on port 4000');
app.listen(PORT);