import { useContext, useEffect, Fragment, useCallback } from "react";

import classes from "./PlayerCard.module.css";
import PlayingCard from "./PlayingCard";
import Button from "../UI/button";

import roundContext from "../../store/round";

const PlayerCard = (props) => {
  const roundCtx = useContext(roundContext);

  useEffect(() => {
    if (roundCtx.playerPoint.length === 0) {
      props.standTrigger();
    }
  }, [roundCtx.playerPoint.length, props.standTrigger]);

  return (
    <div className={classes.playerCard}>
      <div className={classes.card}>
        {roundCtx.playerCards.length === 2 && (
          <Fragment>
            <PlayingCard
              img={
                roundCtx.gameState === "DEAL" || roundCtx.gameState === "STAND"
                  ? roundCtx.playerCards[0].img
                  : "img/cards/facingdown.png"
              }
              id="facingdown"
            />
            <PlayingCard
              img={
                roundCtx.gameState === "DEAL" || roundCtx.gameState === "STAND"
                  ? roundCtx.playerCards[1].img
                  : "img/cards/facingdown.png"
              }
              id="facingdown"
            />
          </Fragment>
        )}

        {roundCtx.playerCards.length > 2 &&
          roundCtx.playerCards.map((card) => {
            return <PlayingCard key={card.id} img={card.img} />;
          })}
      </div>
      <div className={classes.button}>
        <Button onClick={props.dealTrigger} invalid={!roundCtx.gameState == ""}>
          Deal
        </Button>
        <Button
          onClick={props.hitTrigger}
          invalid={
            !(roundCtx.gameState === "DEAL" && roundCtx.gameState !== "STAND")
          }
        >
          Hit
        </Button>
        <Button
          onClick={props.standTrigger}
          invalid={
            !(
              roundCtx.gameState === "DEAL" &&
              Math.max(...roundCtx.playerPoint) >= 16
            )
          }
        >
          Stand
        </Button>
      </div>
    </div>
  );
};

export default PlayerCard;
