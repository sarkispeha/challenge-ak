
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ challenge: 'AK' });
});

const PORT = process.env.PORT || 4000;
console.log('Local Node server listening on port 4000');
app.listen(PORT);