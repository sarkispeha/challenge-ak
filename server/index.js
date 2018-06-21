const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Lesson'); 

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());

// require('./routes/core')(app);
require('./routes/api/lessonRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    console.log('PRODUCTION ENVIRONMENT!!!!!!');
    app.use(express.static('client/build'));
    // app.use(express.static(path.join(__dirname, 'client/build')));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        // res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
}

const PORT = process.env.PORT || 4000;
console.log('Local Node server listening on port 4000');
app.listen(PORT);