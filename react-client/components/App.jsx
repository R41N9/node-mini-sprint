import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: ''
    }
    this.getQuote = this.getQuote.bind(this);
    this.addQuote = this.addQuote.bind(this);
  }

  getQuote(e) {
    e.preventDefault();
    console.log("hello from getQuote")
    axios.get('/quote')
    .then((data) => {
      console.log(data)
      this.setState({
        quote: data.data[0].text
      })
    })
    .catch((err) => {
      console.log('getQuote error: ', err);
      throw err;
    })
  }

  addQuote(e) {
    e.preventDefault();
    var newQuote = { text: e.target[0].value }
    axios.post('/quote', newQuote)
    .then((response) => {
      console.log('Response: ', response);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    })
  }

  render() {
    return (
      <div>
        <h1>Random Quote Generator</h1>

        <h2 id="quote">{this.state.quote}</h2>
        <form onSubmit={this.addQuote}>
          <input type="text"></input>
          <button id="submit">Submit Quote</button>
          <p id="response"></p>
        </form>
        <form>
          <button id='get-quote' onClick={this.getQuote}>Generate Quote</button>
        </form>
      </div>
    )
  }

};


export default App;
