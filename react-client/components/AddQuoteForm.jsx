import React from 'react';

class AddQuoteForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      input: props.input
    }
    this.quoteEntryHandler = this.quoteEntryHandler.bind(this);
  }

  quoteEntryHandler(e) {
    e.preventDefault();
    var input = e.target.value;
    this.setState({
      input: input
    }, () => {
      this.props.inputOnChangeHandler(this.state.input);
    })
  }

  render() {
    return (
      <form onSubmit={this.props.addQuote}>
        <input type="text" onChange={this.quoteEntryHandler} value={this.props.input}></input>
        <button id="submit">Submit Quote</button>
      </form>
    )
  }

}

export default AddQuoteForm