import React from 'react'
import styles from './LinkButton.module.css'
import {Link} from 'react-router-dom'

function LinkButton({to, text, btn_style}) {



    return (
     <Link className={`${styles.btn} ${btn_style}`}  to={to}>
       {text}
     </Link>  
    )
}

export default LinkButton