import React from 'react';

class DeleteQuotesForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <form>
        <button id="delete-quotes" onClick={this.props.deleteAddedQuotes}>Delete Added Quotes</button>
      </form>
    )
  }

}

export default DeleteQuotesForm