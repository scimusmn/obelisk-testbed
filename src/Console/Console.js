import React from 'react';

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      scrolling: true,
    };

    this.consoleEnd = null;
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.toggleScrolling = this.toggleScrolling.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.echo('== begin stelduino testbed ==');
  }

  toggleScrolling() {
    const { scrolling } = this.state;
    this.setState({ scrolling: !scrolling });
  }

  scrollToEnd() {
    if (this.consoleEnd) {
      this.consoleEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  put(message, type) {
    if (type === 'ECHO' || type === 'SEND' || type === 'RECV') {
      const { lines, scrolling } = this.state;
      this.setState({
        lines: lines.concat([
          <React.Fragment>
            <font className={type}>
              [
              {new Date().toISOString()}
              ]
              {' '}
              {type}
  :
            </font>
            {' '}
            {message}
            <br />
          </React.Fragment>,
        ]),
      });
      if (scrolling) {
        this.scrollToEnd();
      }
    }
  }

  echo(message) {
    this.put(message, 'ECHO');
  }

  send(message) {
    this.put(message, 'SEND');
  }

  recv(message) {
    this.put(message, 'RECV');
  }

  clear() {
    this.setState({
      lines: [],
    });
    // this.echo('== clear ==');
  }

  render() {
    const { lines, scrolling } = this.state;
    return (
      <div>
        <div className="ConsoleContainer">
          <div className="ConsoleText">
            {lines}
          </div>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={(element) => { this.consoleEnd = element; }}
          />
        </div>
        <div className="ConsoleControl">
          <input className="button" type="button" value="Clear" onClick={this.clear} />
          <label className="ConsoleScrolling" htmlFor="Scroll to new messages">
            <input type="checkbox" checked={scrolling} onChange={this.toggleScrolling} />
            Scroll to new messages
          </label>
        </div>
      </div>
    );
  }
}

export default Console;
