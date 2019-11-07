import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
// import Nav from '../components/Nav';
import Link from 'next/link';

import './Landing.scss';
import Header from './Header/Header';
import Button from '../../components/common/Button/Button';

const Landing = props => {
  return (
    <div className="landing">
      <Head>
        <title>Бесплатный фитнес</title>
      </Head>

      {/* <Header /> */}

      <div className="cube">
        <div className="intro">
          <h1>
            Free <br /> fitness
          </h1>
          <h3>
            У тебя появилась уникальная <br /> возможность заниматься <br /> спортом совершенно
            бесплатно
          </h3>
          <Link href="/search">
            <Button>Начать</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;

{
  /* <h3>Наши группы</h3>
<ul>
  {[
    {
      link: 'https://vk.com/free_fitness_minsk',
      text: 'vk',
    },
  ].map(({ link, text }) => {
    return (
      <li key={link}>
        <a href={link} target="_blank">
          {text}
        </a>
      </li>
    );
  })}
</ul> */
}
