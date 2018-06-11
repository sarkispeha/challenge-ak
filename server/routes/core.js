
module.exports = (app) =>{
  app.get('/', (req, res) => {
    res.send({ challenge: 'AK' });
  });
}