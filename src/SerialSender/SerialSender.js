import React from 'react';
import propTypes from 'prop-types';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class SerialSender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      value: '',
    };

    this.changeMessage = this.changeMessage.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  changeMessage(event) {
    this.setState({ message: event.target.value });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  changeValue(event) {
    this.setState({ value: event.target.value });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  sendMessage() {
    const { sendData } = this.props;
    const { message: m, value: v } = this.state;
    sendData(
      JSON.stringify({
        message: m,
        value: v,
      }),
      m,
    );
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  render() {
    const { message, value } = this.state;
    return (
      <div>
        <form className="SerialSender">
        Message:
          {' '}
          <input
            className="SerialSenderElement"
            type="text"
            value={message}
            onChange={this.changeMessage}
          />
        Value:
          {' '}
          <input
            className="SerialSenderElement"
            type="text"
            value={value}
            onChange={this.changeValue}
          />
          <input className="button" type="button" value="Send" onClick={this.sendMessage} />
        </form>
      </div>
    );
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SerialSender.propTypes = {
  sendData: propTypes.func.isRequired,
};

export default SerialSender;
