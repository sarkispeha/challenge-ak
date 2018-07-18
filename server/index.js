const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Lesson');
require('./models/User');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());

// require('./routes/core')(app);
require('./routes/api/lessonRoutes')(app);
require('./routes/api/userRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;
console.log('Node server listening on port: '+ PORT);
app.listen(PORT);