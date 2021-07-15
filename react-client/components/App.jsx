import React from 'react';
import ReactDOM from 'react-dom';
import QuoteContainer from './QuoteContainer.jsx';
import AddQuoteForm from './AddQuoteForm.jsx';
import GenerateQuoteForm from './GenerateQuoteForm.jsx';
import UpdateQuotesForm from './UpdateQuotesForm.jsx';
import DeleteQuotesForm from './DeleteQuotesForm.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: '',
      input: ''
    }
    this.getQuote = this.getQuote.bind(this);
    this.addQuote = this.addQuote.bind(this);
    this.updateQuotes = this.updateQuotes.bind(this);
    this.deleteAddedQuotes = this.deleteAddedQuotes.bind(this);
    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
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
    var newQuote = { text: this.state.input }
    axios.post('/quote', newQuote)
    .then((response) => {
      console.log('Add Quote Response: ', response);
      this.setState({ input: '' });
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
    axios.delete('/quote')
    .then((response) => {
      console.log('Delete Added Quotes Response: ', response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  inputOnChangeHandler(input) {
    this.setState({ input: input })
  }

  render() {
    return (
      <main>
        <h1>Random Quote Generator</h1>

        <QuoteContainer quote={this.state.quote}/>
        <AddQuoteForm input={this.state.input} addQuote={this.addQuote} inputOnChangeHandler={this.inputOnChangeHandler}/>
        <GenerateQuoteForm getQuote={this.getQuote}/>
        <UpdateQuotesForm updateQuotes={this.updateQuotes}/>
        <DeleteQuotesForm deleteAddedQuotes={this.deleteAddedQuotes}/>
      </main>
    )
  }
};


export default App;
