import React from 'react'
import classes from './button.module.css'

const button = (props) => {
    return (    
            <button disabled = {props.invalid} onClick={props.onClick} className={classes['button-24']}>
            {props.children}
            </button>
    )
}

export default button
