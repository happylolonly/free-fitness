import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, ...rest }) => {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
