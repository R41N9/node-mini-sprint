const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { conn } = require('./db/index.js');
const bluebird = require('bluebird');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'Never should have come here!',
  'Let me guess. Someone stole your sweetroll.',
  'Sorry lass, I\'\'ve got important things to do.',
  'Kill Paarthunax',
  'My parents said not to talk to strangers, but you seem alright.'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var getMaxId = async() => {
  var getCommand = `SELECT MAX(id) FROM quotes;`
  var maxId = await db.queryAsync(getCommand);
  return maxId[0]['MAX(id)'];
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../react-client/dist/')));


const db = bluebird.promisifyAll(conn);

app.route('/quote')
  .get(async (req, res) => {
    try {
      var randomIdx = getRandomInt(1, await getMaxId() + 1);
      var sql = `SELECT text FROM quotes WHERE (id = ?);`
      var queryArgs = [randomIdx]
      var quoteData = await db.queryAsync(sql, queryArgs)
      res.send(quoteData)
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
      var sql = `INSERT INTO quotes (id, text) VALUES (?, ?);`
      var nextId = await getMaxId() + 1;
      var queryArgs = [nextId, req.body.text];
      try {
        var result = await db.queryAsync(sql, queryArgs);
        res.sendStatus(201);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    })


app.listen(port, () => {
  console.log('Server is running in the terminal!');
  console.log(`Listening on http://localhost:${port}`);
  db.queryAsync(`SELECT COUNT(*) AS count FROM quotes;`)
    .then((data) => {
      if (data[0].count === 0) {
        db.queryAsync(`INSERT INTO quotes (id, text) VALUES (1, '${quotes[0]}'), (2, '${quotes[1]}'), (3, '${quotes[2]}'), (4, '${quotes[3]}'), (5, '${quotes[4]}');`);
      }
    })
})


exports.getRandomInt = getRandomInt;
exports.quotes = quotes;