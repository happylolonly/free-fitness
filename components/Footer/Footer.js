import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import './Footer.scss';

const Footer = props => {
  return (
    <div className="footer">
      <a href="https://vk.com/free_fitness_minsk" target="_blank">
        <img src={require('./images/vk.svg')} alt="" />
      </a>
      <a target="_blank" href="https://www.facebook.com/free.fitness.minsk/">
        <img src={require('./images/facebook.svg')} alt="" />
      </a>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
