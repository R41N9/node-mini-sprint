import React from 'react';

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



export default App;
