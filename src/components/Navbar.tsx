import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styles from "./Navbar.module.css"
import imglogo from "../img/syslogo.png";
import LinkButton from './LinkButton.tsx';

const Navbar = ({linkTo, texto}) => {

  const location = useLocation();

  
  const excludedRoutes = ['/'];

  if (excludedRoutes.includes(location.pathname)) {
    return null;
  }
  
  return (
    <div className={styles.navbar}>
    <Link to='/'>
      <img className={styles.navbar_logo} src={imglogo} alt="logo-navbar"/>
    </Link>
    <LinkButton to={linkTo} text={texto} btn_style={styles.btn_home} />
  </div>
  )
}

export default Navbar