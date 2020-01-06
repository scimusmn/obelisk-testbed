/* eslint import/no-named-as-default: 0 */
/* eslint import/no-named-as-default-member: 0 */
import React from 'react';
import propTypes from 'prop-types';
import Console from '../Console/Console';
import SerialSendBox from '../SerialSender/SerialSendBox';
import { ARDUINO_READY, WAKE_ARDUINO } from '../Serial/arduinoConstants';
import withSerialCommunication from '../Serial/SerialHOC';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handshake: false,
    };

    this.console = null;

    this.checkHandshake = this.checkHandshake.bind(this);
    this.onSerialData = this.onSerialData.bind(this);
    this.updateHandshake = this.updateHandshake.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  componentDidMount() {
    const { setOnDataCallback } = this.props;
    setOnDataCallback(this.onSerialData);
    document.addEventListener('keydown', this.handleReset);
    this.checkHandshake();
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  onSerialData(data) {
    const { handshake } = this.state;

    if (data.message === ARDUINO_READY.message && !handshake) {
      this.updateHandshake();
    }

    const dataString = JSON.stringify(data);
    this.console.recv(dataString, data.message);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  checkHandshake() {
    const { sendData } = this.props;

    sendData(JSON.stringify(WAKE_ARDUINO));

    setTimeout(() => {
      this.checkHandshake();
    }, 5000);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  updateHandshake() {
    this.setState({
      handshake: true,
    });
    this.console.echo('handshake with arduino!');
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  sendMessage(message) {
    const { sendData } = this.props;
    sendData(message);
    this.console.send(message);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  render() {
    return (
      <div>
        <SerialSendBox sendData={this.sendMessage} />
        <Console ref={(element) => { this.console = element; }} />
      </div>
    );
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

App.propTypes = {
  sendData: propTypes.func.isRequired,
  setOnDataCallback: propTypes.func.isRequired,
};

const AppWithSerialCommunication = withSerialCommunication(App);
export default AppWithSerialCommunication;
