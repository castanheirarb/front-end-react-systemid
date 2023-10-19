import imglogo from "../img/syslogo.png";
import styles from "./Home.module.css";
import React from "react";
import LinkButton from "../components/LinkButton.tsx";
import stylesBTN from '../components/LinkButton.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <img src={imglogo} alt="Logo Systemid" />
      <h1 className={styles.h1}>Bem vindo</h1>
      <h2>Gestão de horas</h2>
      <section className={styles.c_btn}>
        <LinkButton to="/analista" text="Analistas" btn_style={stylesBTN.btn_home} />
        <LinkButton to="/projetos" text="Projetos" btn_style={stylesBTN.btn_home}/>
        <LinkButton to='/clientes' text='Clientes'btn_style={stylesBTN.btn_home}/>
      </section>
    </div>
  );
};

export default Home;
