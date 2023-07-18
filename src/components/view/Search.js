import React, { Component } from 'react';
// import uuidv4 from 'uuid/v4';

// Import styles
// import './Search.scss';

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      showClear: false,
      inputValue: ''
    }
  }

  render() {
    const {
      classes = '', // accepts CSS classNames as string
      title = '',
      onChangeHandler,
      icon = 'search',
      type = 'text',
      value = '',
      placeholder = 'Søk'
    } = this.props;
    const {
      inputValue,
      showClear,
    } = this.state;
    return (
      <div className={`search${classes ? ' ' + classes : ''}`}>
        <label htmlFor="search" >
          {title &&
            <p className="search__label">{title}</p>
          }
          <input
            className="search__input"
            autoComplete="off"
            value={value ? value : inputValue}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              this.setState({
                showClear: (e.target.value !== ''),
                inputValue: e.target.value
              })
              onChangeHandler(e.target.value)
            }}
          />
          
        </label>
      </div>
    );
  }
}

export default Search;