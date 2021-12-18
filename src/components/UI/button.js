import React from 'react'
import classes from './button.module.css'

const button = (props) => {
    return (
        <button onClick={props.onClick} className={classes['button-24']}>
            {props.children}
        </button>
    )
}

export default button
