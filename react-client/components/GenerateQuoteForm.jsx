import React from 'react';

class GenerateQuoteForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <form>
        <button id="get-quote" onClick={this.props.getQuote}>Generate Quote</button>
      </form>
    )
  }

}

export default GenerateQuoteForm