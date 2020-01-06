/* eslint arrow-parens: 0 */
/* eslint max-len: 0 */

import React from 'react';
import Select from 'react-select';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const filterOptions = [
  { value: 'off', label: 'No filtering' },
  { value: 'positive', label: 'Show selected' },
  { value: 'negative', label: 'Hide selected' },
];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      scrolling: true,
      consoleActive: true,
      filterState: filterOptions[0],
      filters: [],
      activeFilters: [],
    };

    this.consoleEnd = null;
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.toggleScrolling = this.toggleScrolling.bind(this);
    this.toggleConsoleActive = this.toggleConsoleActive.bind(this);
    this.setFilterState = this.setFilterState.bind(this);
    this.setActiveFilters = this.setActiveFilters.bind(this);
    this.clear = this.clear.bind(this);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  componentDidMount() {
    this.echo('== begin stelduino testbed ==');
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  setFilterState(filterOption) {
    this.setState({ filterState: filterOption });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  setActiveFilters(filterArray) {
    if (filterArray === null) {
      this.setState({ activeFilters: [] });
    } else {
      const activeFilters = filterArray.map((f) => f.value);
      this.setState({ activeFilters });
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  toggleScrolling() {
    const { scrolling } = this.state;
    this.setState({ scrolling: !scrolling });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  toggleConsoleActive() {
    const { consoleActive } = this.state;
    this.setState({ consoleActive: !consoleActive });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  scrollToEnd() {
    if (this.consoleEnd) {
      this.consoleEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  put(message, key, type) {
    const { consoleActive } = this.state;
    if (consoleActive && (type === 'ECHO' || type === 'SEND' || type === 'RECV')) {
      const { lines, scrolling, filters } = this.state;
      const newLine = {
        line: (
          <React.Fragment key={lines.length}>
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
          </React.Fragment>),
        key,
      };

      if (!filters.includes(key)) {
        this.setState({
          filters: filters.concat([key]),
        });
      }

      this.setState({
        lines: lines.concat([newLine]),
      });
      if (scrolling) {
        this.scrollToEnd();
      }
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  echo(message) {
    this.put(message, 'echo', 'ECHO');
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  send(message, key) {
    this.put(message, key, 'SEND');
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  recv(message, key) {
    this.put(message, key, 'RECV');
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  clear() {
    this.setState({
      lines: [],
    });
    // this.echo('== clear ==');
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  render() {
    const {
      lines, scrolling, consoleActive, filterState, filters, activeFilters,
    } = this.state;
    const filteredLines = lines.filter((lineObject) => {
      if (filterState.value === 'off') {
        return true;
      }
      if (filterState.value === 'positive') {
        return (activeFilters.includes(lineObject.key));
      }
      if (filterState.value === 'negative') {
        return !(activeFilters.includes(lineObject.key));
      }
      return false;
    });
    const linesToShow = filteredLines.map(lineObject => lineObject.line);
    const filtersToShow = filters.map((filterKey) => ({ value: filterKey, label: filterKey }));
    const activeFiltersToShow = activeFilters.map((filterKey) => ({ value: filterKey, label: filterKey }));
    return (
      <div>
        <div className="ConsoleContainer">
          <div className="ConsoleText">
            {linesToShow}
          </div>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={(element) => { this.consoleEnd = element; }}
          />
        </div>
        <div className="ConsoleControl">
          <input className="button" type="button" value="Clear" onClick={this.clear} />
          <Select
            className="ConsoleFilteringState"
            defaultValue={filterOptions[0]}
            value={filterState}
            onChange={this.setFilterState}
            options={filterOptions}
          />
          <Select
            className="ConsoleFilteringSelection"
            isMulti="true"
            value={activeFiltersToShow}
            options={filtersToShow}
            onChange={this.setActiveFilters}
          />
          <div className="ConsoleScrolling">
            <label htmlFor="Console active">
              <input type="checkbox" checked={consoleActive} onChange={this.toggleConsoleActive} />
              Console active
            </label>
            <br />
            <label htmlFor="Scroll to new messages">
              <input type="checkbox" checked={scrolling} onChange={this.toggleScrolling} />
              Scroll to new messages
            </label>
          </div>
        </div>
      </div>
    );
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default Console;
