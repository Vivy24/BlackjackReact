import { useContext, Fragment, useState, useEffect } from "react";

import classes from "./ComputerCard.module.css";
import PlayingCard from "./PlayingCard";

import roundContext from "../../store/round";

const ComputerCard = () => {
  const roundCtx = useContext(roundContext);

  const [computerCard, setComputerCard] = useState([]);
  useEffect(() => {
    setComputerCard(roundCtx.computerCards);
  }, [roundCtx]);

  return (
    <div className={classes.computerCard}>
      {computerCard.length === 2 && (
        <Fragment>
          <PlayingCard
            img={
              roundCtx.gameState === "DEAL" || roundCtx.gameState === "STAND"
                ? computerCard[0].img
                : "img/cards/facingdown.png"
            }
            id="facingdown"
          />
          <PlayingCard
            img={
              roundCtx.gameState === "STAND"
                ? computerCard[1].img
                : "img/cards/facingdown.png"
            }
            id="facingdown"
          />
        </Fragment>
      )}

      {computerCard.length > 2 &&
        roundCtx.gameState === "STAND" &&
        computerCard.map((card) => {
          return <PlayingCard key={card.id} img={card.img}></PlayingCard>;
        })}
    </div>
  );
};

export default ComputerCard;
