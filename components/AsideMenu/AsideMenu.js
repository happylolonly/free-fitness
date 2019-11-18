import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

import './AsideMenu.scss';

const links = [{ href: '/search', label: 'Мероприятия' }].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Menu = props => {
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
            <Link href={href} as={href}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        <li>
          <Link href="/feedback">
            <a>Написать нам</a>
          </Link>
        </li>
        <li>
          <Link href="/new">Добавить мероприятие</Link>
        </li>
      </ul>
    </aside>
  );
};

Menu.propTypes = { menu: PropTypes.array };

Menu.defaultProps = { menu: [] };

export default Menu;
