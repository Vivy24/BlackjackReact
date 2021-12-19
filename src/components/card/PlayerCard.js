import {useContext, Fragment} from 'react'

import classes from './PlayerCard.module.css'
import PlayingCard from './PlayingCard'
import Button from '../UI/button'

import roundContext from '../../store/round'


const PlayerCard = () => {
    const roundCtx = useContext(roundContext);
    console.log(roundCtx);

    const dealTrigger = () => {
        roundCtx.triggerDeal();
    }

    const hitTrigger = () => {
        roundCtx.addPlayerCard();
    }
   
    return (
      <div className={classes.playerCard}>
        <div className={classes.card}>
          {roundCtx.playerCards.length == 2 && (
            <Fragment>
              <PlayingCard
                img={
                  roundCtx.isDeal
                    ? roundCtx.playerCards[0].img
                    : "img/cards/facingdown.png"
                }
                id="facingdown"
              />
              <PlayingCard
                img={
                  roundCtx.isDeal
                    ? roundCtx.playerCards[1].img
                    : "img/cards/facingdown.png"
                }
                id="facingdown"
              />
            </Fragment>
          )}

          {roundCtx.playerCards.length > 2 &&
            roundCtx.playerCards.map((card) => {
              return <PlayingCard img={card.img} />;
            })}
        </div>
        <div className={classes.button}>
          <Button onClick={dealTrigger}>Deal</Button>
          <Button onClick={hitTrigger}>Hit</Button>
          <Button>Stand</Button>
        </div>
      </div>
    );
}

export default PlayerCard
