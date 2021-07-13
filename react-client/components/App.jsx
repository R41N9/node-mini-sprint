import React from 'react';
import Server from '/server/index.js'

const App = () => {
  return (
    <div>
      <h1>Random Quote Generator</h1>

      <h2 id="quote">make this put a random quote on the screen</h2>
      <form>
        <input type="text"></input>
          <button id="submit">Submit</button>
          <p id="response"></p>
    </form>
      <form>
        <button id='gen-quote'>Generate Quote</button>
      </form>
    </div>
  )
};

const Quote = () => {
  var len = Server.quotes.length;
  var randomIdx = Server.getRandomInt(0, len);
  return (
    <q>{Server.quotes[randomIdx]}</q>
  );
}

const getQuote = () => {
  var len = Server.quotes.length;
  var randomIdx = Server.getRandomInt(0, len);
  var quoteElem = getElementById('quote');
  while (quoteElem.firstChild) {
    quoteElem.removeChild(quoteElem.firstChild);
  }
  ReactDOM.render(<Quote />, document.getElementById('quote'));
}

const addQuote = (quote) => {
  Server.quotes.push(quote);
}

export default App;
