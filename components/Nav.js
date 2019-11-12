import React, { useState } from 'react';
import Link from 'next/link';

import AsideMenu from './AsideMenu/AsideMenu';

import './Nav.scss';

const links = [{ href: '/search', label: 'Мероприятия' }].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => {
  const [isShowMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!isShowMenu);
  };

  return (
    <>
      <nav className="nav">
        <div
          className={'menu-button ' + (isShowMenu ? 'active' : 'not-active')}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </div>
        <ul>
          <li>
            <Link href="/">
              <a onClick={toggleMenu}>На главную</a>
            </Link>
          </li>
          {links.map(({ key, href, label }) => (
            <li key={key}>
              <Link href={href}>
                <a onClick={toggleMenu}>{label}</a>
              </Link>
            </li>
          ))}
        </ul>

        <ul>
          <li>
            <a
              href="https://vk.com/im?media=&sel=-129982085"
              onClick={toggleMenu}
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать нам
            </a>
          </li>
          <li>
            <Link href="/new">
              <a onClick={toggleMenu}>Добавить мероприятие</a>
            </Link>
          </li>
        </ul>
      </nav>

      {isShowMenu && <AsideMenu toggleMenu={toggleMenu} />}
    </>
  );
};

export default Nav;
