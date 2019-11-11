import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

import './AsideMenu.scss';

const links = [{ href: '/search', label: 'Мероприятия' }].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Menu = ({ toggleMenu }) => {
  return (
    <aside className="menu">
      <ul>
        <li>
          <Link href="/">
            <a>На главную</a>
          </Link>
        </li>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href} as={href} onClick={toggleMenu}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        <li>
          <a
            href="https://vk.com/im?media=&sel=-129982085"
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать нам
          </a>
        </li>
        <li>
          <Link href="/new" activeClassName="active" onClick={toggleMenu}>
            Добавить мероприятие
          </Link>
        </li>
      </ul>
    </aside>
  );
};

Menu.propTypes = { menu: PropTypes.array };

Menu.defaultProps = { menu: [] };

export default Menu;
