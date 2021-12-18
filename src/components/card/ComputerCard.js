import {useContext} from 'react'

import classes from './ComputerCard.module.css'
import PlayingCard from './PlayingCard'

import roundContext from '../../store/round'

const ComputerCard = () => {
    const roundCtx = useContext(roundContext);


    return (
        <div className={classes.computerCard}>
            <PlayingCard img={roundCtx.isDeal ? roundCtx.computerCards[0].img:'img/cards/facingdown.png'} id="facingdown"/>   
            <PlayingCard img={'img/cards/facingdown.png'} id="facingdown"/>   
        </div>
    )
}

export default ComputerCard
