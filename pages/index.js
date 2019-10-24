import React from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import Link from "next/link";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {/* <Nav /> */}

    <h3>Бесплатные фитнес мероприятия в Минске</h3>

    <Link href="/search">Смотреть мероприятия</Link>

    <h3>Наши группы</h3>
    <ul>
      {[
        {
          link: "https://vk.com/free_fitness_minsk",
          text: "vk"
        }
      ].map(({ link, text }) => {
        return (
          <li key={link}>
            <a href={link} target="_blank">
              {text}
            </a>
          </li>
        );
      })}
    </ul>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
);

export default Home;
