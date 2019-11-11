import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import './Header.scss';

const Header = props => {
  return (
    <ul className="header">
      <li>
        <Link href="/search">
          <a>Главная</a>
        </Link>
      </li>
      <li>
        <Link href="/search">
          <a>Мероприятия</a>
        </Link>
      </li>
      <li>
        <Link href="/search">
          <a>О нас</a>
        </Link>
      </li>
      <li>
        <Link href="/search">
          <a>Контакты</a>
        </Link>
      </li>
    </ul>
  );
};

Header.propTypes = {};

export default Header;
