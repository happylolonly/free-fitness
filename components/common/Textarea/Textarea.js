import React from 'react';
import PropTypes from 'prop-types';

import './Textarea.scss';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
};

const Textarea = ({ label, placeholder, name, autoFocus, onChange, rows, value, error }) => {
  function handleChange(event) {
    const element = event.target;

    if (element.scrollHeight > element.clientHeight) {
      element.style.height = element.scrollHeight + 'px';
    }

    onChange(event.target.value, name, event);
  }

  return (
    <div className="textarea">
      {label && <label>{label}</label>}
      <textarea
        name={name}
        id={name}
        value={value}
        cols="30"
        autoFocus={autoFocus}
        rows={rows || 5}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

Textarea.propTypes = propTypes;

export default Textarea;
