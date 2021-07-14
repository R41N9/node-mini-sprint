const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { conn } = require('./db/index.js')

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

// const handleRequest = function(req, res) {
//   console.log(`Endpoint: ${req.url} Method: ${req.method}`);

//   // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
//   if (req.url == '/') {
//     console.log('redirecting');
//     res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
//     res.end();
//   }

//   // TODO: GET ONE
//   if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
//     var randomIndex = getRandomInt(0, quotes.length);
//     res.writeHead(200, headers);
//     res.write(`<q>${quotes[randomIndex]}</q>`);
//     res.end()

//   }
//   // TODO: POST/CREATE
//   else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
//     console.log(req.text);
//     quotes.push(req.text);
//     res.writeHead(200, headers);
//     res.write('<span>Quote Added to Library</span>')
//     res.end()
//   }

// //CATCH ALL ROUTE
//   else {
//     res.writeHead(404,headers);
//     res.end('Page not found');

//   }
// }

// app.options((req, res) => {
//   res.sendStatus(204)
//   res.end()
// })

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../react-client/dist/')));

// app.get('/', (req, res) => {
//   res.redirect(301, `http://localhost:${port}/quote`);
//   res.end()
// })



app.route('/quote')
  .get((req, res) => {
    conn.query(`DELETE FROM quotes WHERE (id >= 1 & id <= 5);`, (err, data) => {
      if (err) {
        data.send(err);
      }
      for (var i = 0; i < quotes.length; i++) {
        conn.query(`INSERT INTO quotes (id, text) VALUES (${i + 1}, '${quotes[i]}');`, (err, data) => {
          if (err) {
            console.error(err);
            data.send(err);
          }
          console.log('Quote Loaded');
        })
      }
    })
    .then(() => {
      conn.query(`SELECT MAX(id) FROM quotes`, (err, response) => {
        if (err) {
          console.error(err);
          res.send(err);
        }
        randomIdx = getRandomInt(0, response[0]['MAX(id)']);
        var sql = `SELECT text FROM quotes WHERE (id = ?);`
        var queryArgs = [randomIdx]
        conn.query(sql, queryArgs, (err, res) => {
          if (err) {
            console.error(err);
            res.send(err);
          }
          res.send(res);
        })
      })
    })
  })
  .post((req, res) => {
    var sql = `INSERT INTO quotes (text) VALUES (?);`
    var queryArgs = [req.body.text]
    conn.query(sql, queryArgs, (err, data) => {
      if (err) {
        console.error(err);
        data.send(err);
      }
      console.log(data);
    })
    res.send('Quote added to library');
  })

// const server = http.createServer(app);
// server.listen(port);

app.listen(port, () => {
  console.log('Server is running in the terminal!');
  console.log(`Listening on http://localhost:${port}`);
})


exports.getRandomInt = getRandomInt;
exports.quotes = quotes;