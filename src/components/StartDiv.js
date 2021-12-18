import React from 'react'
import classes from './StartDiv.module.css'
import Button from './UI/button'

const StartDiv = (props) => {
    return (
      <div className={classes.starting}>
        <h3>Black <span style={{color:'red'}}>Jack</span></h3>
        <Button onClick={props.onStart}>Start Game!</Button>
      </div>
    );
}

export default StartDiv
