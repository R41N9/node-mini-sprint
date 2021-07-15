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
    this.updateQuotes = this.updateQuotes.bind(this);
    this.deleteAddedQuotes = this.deleteAddedQuotes.bind(this);
  }

  getQuote(e) {
    e.preventDefault();
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
      console.log('Add Quote Response: ', response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  updateQuotes(e) {
    e.preventDefault();
    var newQuotes = [
      'NEVER GONNA GIVE YOU UP',
      'NEVER GONNA LET YOU DOWN',
      'NEVER GONNA RUN AROUND AND HURT YOU',
      'NEVER GONNA MAKE YOU CRY',
      'NEVER GONNA SAY GOODBYE'
    ]
    axios.put('/quote', newQuotes)
    .then((response) => {
      console.log('Update Quotes Response: ', response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  deleteAddedQuotes(e) {
    e.preventDefault();
    console.log('hello from deleteAddedQuotes')
    axios.delete('/quote')
    .then((response) => {
      console.log('Delete Added Quotes Response: ', response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <main>
        <h1>Random Quote Generator</h1>

        <h2 id="quote">{this.state.quote}</h2>
        <form onSubmit={this.addQuote}>
          <input type="text"></input>
          <button id="submit">Submit Quote</button>
        </form>
        <form>
          <button id="get-quote" onClick={this.getQuote}>Generate Quote</button>
        </form>
        <form>
          <button id="update-quotes" onClick={this.updateQuotes}>Update Default Quotes</button>
        </form>
        <form>
          <button id="delete-quotes" onClick={this.deleteAddedQuotes}>Delete Added Quotes</button>
        </form>
      </main>
    )
  }

};


export default App;
