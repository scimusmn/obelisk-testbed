import React from 'react';
import propTypes from 'prop-types';
import SerialSender from './SerialSender';

class SerialSendBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senders: [],
    };

    this.addSender = this.addSender.bind(this);
    this.delSender = this.delSender.bind(this);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  componentDidMount() {
    this.addSender()
      .addSender()
      .addSender()
      .addSender();
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  addSender() {
    const { sendData } = this.props;
    const { senders } = this.state;
    this.setState({
      senders: senders.concat([
        <SerialSender sendData={sendData} />,
      ]),
    });

    return this;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  delSender() {
    const { senders } = this.state;
    const lastIndex = senders.length - 1;
    if (lastIndex > 0) {
      this.setState({
        senders: senders.filter((item, index) => index !== lastIndex),
      });
    }
    return this;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  render() {
    const { senders } = this.state;
    return (
      <div className="SerialSenderBox">
        <form style={{ 'margin-left': '8px' }}>
          <input className="button" type="button" value="Add" onClick={this.addSender} />
          <input className="button" style={{ 'margin-left': '4px' }} type="button" value="Remove" onClick={this.delSender} />
        </form>
        {senders}
      </div>
    );
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SerialSendBox.propTypes = {
  sendData: propTypes.func.isRequired,
};

export default SerialSendBox;
