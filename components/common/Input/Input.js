import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  // type
  icon: PropTypes.string,

  error: PropTypes.string,
};

const Input = ({ value, name, placeholder, onChange, autoComplete, icon, label, error, type }) => {
  function handleChange(event) {
    const { value } = event.target;
    onChange(value, name, event);
  }

  return (
    <div className="input">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-inner">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete={autoComplete}
        />
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

Input.propTypes = propTypes;

export default Input;
