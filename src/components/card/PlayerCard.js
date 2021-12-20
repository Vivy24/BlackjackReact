import {useContext, useEffect, Fragment} from 'react'

import classes from './PlayerCard.module.css'
import PlayingCard from './PlayingCard'
import Button from '../UI/button'

import roundContext from '../../store/round'


const PlayerCard = () => {
  
    const roundCtx = useContext(roundContext);
    console.log(roundCtx);

    useEffect(()=>{
      if(roundCtx.playerPoint.length === 0){
        standTrigger();
     }
    },[roundCtx.playerPoint.length])

    const dealTrigger = () => {
        roundCtx.triggerDeal();
    }

      
    const standTrigger = () => {
      // to do: check diem computer 
      roundCtx.triggerStand();
      console.log("Stand get triggered");
    }

    const hitTrigger = () => {
        roundCtx.addCard({storage: roundCtx.playerCards ,point:roundCtx.playerPoint ,addType: 'P'});
    }
 
    return (
      <div className={classes.playerCard}>
        <div className={classes.card}>
          {roundCtx.playerCards.length == 2 && (
            <Fragment>
              <PlayingCard
                img={
                  roundCtx.gameState==='DEAL' ||  roundCtx.gameState==='STAND'
                    ? roundCtx.playerCards[0].img
                    : "img/cards/facingdown.png"
                }
                id="facingdown"
              />
              <PlayingCard
                img={
                  roundCtx.gameState==='DEAL' ||  roundCtx.gameState==='STAND'
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
          <Button  onClick={dealTrigger} invalid ={!roundCtx.gameState == ""}>Deal</Button>
          <Button onClick={hitTrigger} invalid ={!(roundCtx.gameState === "DEAL" && roundCtx.gameState !== 'STAND')}>Hit</Button>
          <Button onClick= {standTrigger} invalid ={!(roundCtx.gameState === "DEAL")}>Stand</Button>
        </div>
      </div>
    );
}

export default PlayerCard
