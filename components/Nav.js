import React from 'react';
import Link from 'next/link';
import './Nav.scss';

const links = [{ href: '/search', label: 'Мероприятия' }].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav className="nav">
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
        <a href="https://vk.com/im?media=&sel=-129982085" target="_blank" rel="noopener noreferrer">
          Написать нам
        </a>
      </li>
      <li>
        <Link href="/new">Добавить мероприятие</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
