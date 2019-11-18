import React from 'react';
import PropTypes from 'prop-types';

import './About.scss';

const About = props => {
  return (
    <div className="about">
      <h2>О НАС</h2>
      <img src={require('./images/about.png')} alt="" />
      <p>
        Мы — команда профессионалов в сфере фитнеса. Предлагаем множество популярных и новых,
        эффективных фитнес направлений для начинающих и профессионалов, женщин и мужчин с любым
        уровнем физической подготовки. Наша цель – здоровое и спортивное население страны.
      </p>
    </div>
  );
};

About.propTypes = {};

export default About;
