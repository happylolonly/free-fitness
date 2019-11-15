import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import './Footer.scss';

const Footer = props => {
  return (
    <div className="footer">
      <Link>
        <a>
          <img src={require('./images/facebook.svg')} alt="" />
        </a>
      </Link>
      <Link>
        <a href="https://vk.com/free_fitness_minsk">
          <img src={require('./images/vk.svg')} alt="" />
        </a>
      </Link>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
