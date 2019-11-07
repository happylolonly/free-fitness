import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, className, ...rest }) => {
  return (
    <button className={'button ' + className} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
