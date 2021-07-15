import React from 'react';

class UpdateQuoteForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <form>
        <button id="update-quotes" onClick={this.props.updateQuotes}>Update Default Quotes</button>
      </form>
    )
  }

}

export default UpdateQuoteForm