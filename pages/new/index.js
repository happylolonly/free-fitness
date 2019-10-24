import React from "react";
import PropTypes from "prop-types";
import Nav from "../../components/Nav";

import "./New.scss";

const New = props => {
  return (
    <div className="new-page">
      <Nav />
      <h3>Добавить мероприятия</h3>
      <p>
        У нас пока нету функционала для добавления мероприятия на сайт, но ты
        можешь его добавить{" "}
        <a href="https://vk.com/free_fitness_minsk" target="_blank">
          через нашу группу в Вк
        </a>
        <br />
        Твое мероприятие сразу же появится на сайте;)
      </p>
    </div>
  );
};

New.propTypes = {};

export default New;
