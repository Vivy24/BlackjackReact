import { useReducer } from "react";

import { cardDesk } from "./cardDeck";

import RoundContext from "./round";

const randomCard = () => {
  const randomIndex = Math.floor(Math.random() * 52);
  const randomizedCard = cardDesk[randomIndex];

  return randomizedCard;
};

const defaultRoundContext = {
  cards: cardDesk,
  computerCards: [],
  playerCards: [],
  computerPoint: [0],
  playerPoint: [0],
  gameState: "",
  winner: "",
};

const roundReducer = (state, action) => {
  if (action.type === "RANDOM") {
    const cards = [...state.cards];
    const updatedComputerCards = [];
    const computerCard1 = randomCard();
    const computerCard1Index = cards.indexOf(computerCard1);
    updatedComputerCards.push(computerCard1);
    cards.splice(computerCard1Index, 1);

    const computerCard2 = randomCard();

    const computerCard2Index = cards.indexOf(computerCard2);
    updatedComputerCards.push(computerCard2);
    cards.splice(computerCard2Index, 1);

    const updatedPlayerCards = [];
    const playerCard1 = randomCard();
    const playerCard1Index = cards.indexOf(playerCard1);
    cards.splice(playerCard1Index, 1);
    updatedPlayerCards.push(playerCard1);

    const playerCard2 = randomCard();
    const playerCard2Index = cards.indexOf(playerCard2);
    updatedPlayerCards.push(playerCard2);
    cards.splice(playerCard2Index, 1);
    if (action.card === "start") {
      return {
        ...state,
        cards,
        computerCards: updatedComputerCards,
        playerCards: updatedPlayerCards,
      };
    } else {
      return {
        cards,
        computerCards: updatedComputerCards,
        playerCards: updatedPlayerCards,
        computerPoint: [0],
        playerPoint: [0],
        gameState: "",
        winner: "",
      };
    }
  } else if (action.type === "ADD-CARD") {
    const cards = [...state.cards];
    const updatedCards = [...action.storage];
    let scores = [...action.point];

    let updatedScore = [];
    let validScores;
    let drawMore = false;
    do {
      const newCard = randomCard();
      updatedCards.push(newCard);
      const newCardIndex = cards.indexOf(newCard);
      cards.splice(newCardIndex, 1);

      if (!newCard.point) {
        const point1 = scores.map((point) => {
          return (point += 1);
        });

        const point2 = scores.map((point) => {
          return (point += 10);
        });

        const point3 = scores.map((point) => {
          return (point += 11);
        });

        updatedScore = point1.concat(point2);
        updatedScore = updatedScore.concat(point3);
      } else {
        updatedScore = scores.map((score) => {
          return (score += newCard.point);
        });
      }

      validScores = updatedScore.filter((score) => {
        return score <= 21;
      });
      drawMore =
        (validScores.length === 1 && validScores[0] < 16) ||
        (validScores.length > 1 && Math.max(...validScores) < 16);

      if (drawMore) {
        scores = [...validScores];
      }
    } while (action.cardType === "C" && drawMore);

    if (action.cardType === "C") {
      return {
        ...state,
        cards,
        computerCards: updatedCards,
        computerPoint: validScores,
      };
    }
    return {
      ...state,
      cards,
      playerCards: updatedCards,
      playerPoint: validScores,
    };
  } else if (action.type === "ADD-RESULTS") {
    if (action.cardtype === "C") {
      const computerCards = [...state.computerCards];
      let computerPoints = [...state.computerPoint];
      computerCards.forEach((card) => {
        if (!card.point) {
          const computerPoint1 = computerPoints.map((point) => {
            return (point += 1);
          });

          const computerPoint2 = computerPoints.map((point) => {
            return (point += 10);
          });
          const computerPoint3 = computerPoints.map((point) => {
            return (point += 11);
          });

          computerPoints = computerPoint1.concat(computerPoint2);
          computerPoints = computerPoints.concat(computerPoint3);
        } else {
          const computerPoint = computerPoints.map((point) => {
            return (point += card.point);
          });
          computerPoints = computerPoint;
        }
      });
      return {
        ...state,
        computerPoint: computerPoints,
      };
    } else {
      const playerCards = [...state.playerCards];
      let playerPoints = [...state.playerPoint];

      playerCards.forEach((card) => {
        if (!card.point) {
          const playerPoint1 = playerPoints.map((point) => {
            return (point += 1);
          });

          const playerPoint2 = playerPoints.map((point) => {
            return (point += 10);
          });
          const playerPoint3 = playerPoints.map((point) => {
            return (point += 11);
          });
          playerPoints = playerPoint1.concat(playerPoint2);
          playerPoints = playerPoints.concat(playerPoint3);
        } else {
          const playerPoint = playerPoints.map((point) => {
            return (point += card.point);
          });
          playerPoints = playerPoint;
        }
      });

      return {
        ...state,
        playerPoint: playerPoints,
      };
    }
  } else if (action.type === "DEAL") {
    return {
      ...state,
      gameState: "DEAL",
    };
  } else if (action.type === "STAND") {
    return {
      ...state,
      gameState: "STAND",
    };
  } else if (action.type === "WINNER") {
    const playerPoints = [...state.playerPoint];
    const computerPoints = [...state.computerPoint];
    let winner = "";
    let finalPlayerPoint = 0;
    let finalComputerPoint = 0;
    if (playerPoints.length > 1) {
      finalPlayerPoint = Math.max(...playerPoints);
    } else if (playerPoints.length === 1) {
      finalPlayerPoint = playerPoints[0];
    }

    if (computerPoints.length > 1) {
      finalComputerPoint = Math.max(...computerPoints);
    } else if (computerPoints.length === 1) {
      finalComputerPoint = computerPoints[0];
    }

    if (finalPlayerPoint > finalComputerPoint) {
      winner = "PLAYER";
    } else if (finalPlayerPoint < finalComputerPoint) {
      winner = "COMPUTER";
    } else {
      winner = "DRAW";
    }

    return {
      ...state,
      winner: winner,
    };
  }

  return defaultRoundContext;
};

const RoundProvider = (props) => {
  const [roundState, dispatchRoundAction] = useReducer(
    roundReducer,
    defaultRoundContext
  );

  const randomCardToStart = () => {
    dispatchRoundAction({ type: "RANDOM", card: "start" });
  };

  const triggerDeal = () => {
    dispatchRoundAction({ type: "DEAL" });
  };

  const addResult = (addType) => {
    dispatchRoundAction({ type: "ADD-RESULTS", cardtype: addType });
  };

  const addCard = ({ storage, point, addType }) => {
    dispatchRoundAction({
      type: "ADD-CARD",
      storage,
      point,
      cardType: addType,
    });
  };
  const triggerStand = () => {
    dispatchRoundAction({ type: "STAND" });
  };

  const findWinner = () => {
    dispatchRoundAction({ type: "WINNER" });
  };

  const resetRound = () => {
    dispatchRoundAction({ type: "RANDOM", card: "reset" });
  };
  const roundContext = {
    cards: roundState.cards,
    computerCards: roundState.computerCards,
    playerCards: roundState.playerCards,
    computerPoint: roundState.computerPoint,
    playerPoint: roundState.playerPoint,
    gameState: roundState.gameState,
    winner: roundState.winner,
    randomCard: randomCardToStart,
    triggerDeal: triggerDeal,
    triggerStand: triggerStand,
    addResult: addResult,
    addCard: addCard,
    findWinner: findWinner,
    resetRound: resetRound,
  };

  return (
    <RoundContext.Provider value={roundContext}>
      {props.children}
    </RoundContext.Provider>
  );
};

export default RoundProvider;
