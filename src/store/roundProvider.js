import {useReducer} from 'react'

import {cardDesk} from './cardDeck'

import RoundContext from './round'

const randomCard = (existCardDesk) => {
  let success = false;
  do {
    const randomIndex = Math.floor(Math.random() * 52)
    const randomizedCard = cardDesk[randomIndex];
  
    const existCard = existCardDesk.find((card) => card.id === randomizedCard.id);
    if (!existCard) {
      if (!randomizedCard.point) {
        return {
          card: randomizedCard,
          point: [1, 10],
        };
      }
      return {
        card: randomizedCard,
        point: null,
      };
    }
    console.log({success});
  }
  while(!success)

  
};

const defaultRoundContext = {
    existCard:[],
    computerCards:[],
    playerCards:[],
    computerPoint:[],
    playerPoint:[],
    isDeal:false,
}

const roundReducer = (state, action) => {
  if (action.type === "RANDOM") {
    const existCardDesk = [];
    const updatedComputerCards = [];
    const computerCard1 = randomCard(existCardDesk);
    updatedComputerCards.push(computerCard1.card);
    existCardDesk.push(computerCard1.card);
    const computerCard2 = randomCard(existCardDesk);
    updatedComputerCards.push(computerCard2.card);
    existCardDesk.push(computerCard2.card);
    const updatedPlayerCards = [];
    const playerCard1 = randomCard(existCardDesk);
    updatedPlayerCards.push(playerCard1.card);
    existCardDesk.push(playerCard1.card);
    const playerCard2 = randomCard(existCardDesk);
    updatedPlayerCards.push(playerCard2.card);
    existCardDesk.push(playerCard2.card);

    
    return {
      existCards:existCardDesk,
      computerCards: updatedComputerCards,
      playerCards: updatedPlayerCards,
      computerPoint: [],
      playerPoint: [],
      isDeal: false,
    };
  }
  // else if(action.type ==='ADD-PCARD'){
  //     const updatedPlayerCard = [...state.playerCards]
  //     const playerPoint = [...state.playerPoint]
  //     const newCard = randomCard(state.existCards);
  //     updatedPlayerCard.push(newCard);
  //     if(newCard.point){
  //        const updatedPlayerPoint = playerPoint.map(point=>point+=newCard.point);
  //     }
    
  // }
  // else if (action.type==='ADD-RESULTS'){
  //   if (action.cardtype === 'C'){
  //     const computerCards = [...state.computerCards]
  //     let computerPoints = [...state.computerPoint]
  //     computerCards.forEach(card => {
  //       if (!card.point){
  //         const computerPoint1 = computerPoints.map(point=>{
  //             return point+=1;
  //         })
  //         const computerPoint2 = computerPoints.map(point=>{
  //           return point+=10;
  //         })
  //         computerPoints = computerPoint1.concat(computerPoint2);
  //       }
  //       else {
  //         const computerPoint = computerPoints.map(point=>{
  //           return point+=card.point
  //         })
  //         computerPoints = computerPoint;
  //       }
  //     })

  //     return {
  //       existCards:state.existCards,
  //     computerCards: state.computerCards,
  //     playerCards: state.playerCards,
  //     computerPoint: computerPoints,
  //     playerPoint: state.playerPoint,
  //     isDeal: state.isDeal,
  //     }
  //   }
    
    // const playerCards = [...state.playerCards]
    // let playerPoints = [...state.playerPoint]

  
  // }
  else if (action.type==="DEAL"){
      return {
        existCards:state.existCards,
        computerCards: state.computerCards,
        playerCards: state.playerCards,
        computerPoint: state.computerPoint,
        playerPoint: state.playerPoint,
        isDeal: true,
      }
  }
  return defaultRoundContext;
};

const RoundProvider = props =>{
    const [roundState, dispatchRoundAction] = useReducer(roundReducer,defaultRoundContext);

    const randomCardToStart = ()=> {
        dispatchRoundAction({type:'RANDOM'})
    }

    const triggerDeal = ()=>{
        dispatchRoundAction({type:'DEAL'})
    }

    const addResult = (addType) => {
      dispatchRoundAction({type:'ADD-RESULTS', cardtype:addType})
    }

    const roundContext = {
      existCards: roundState.existCards,
        computerCards: roundState.computerCards,
        playerCards: roundState.playerCards,
        computerPoint:roundState.computerPoint,
        playerPoint:roundState.playerPoint,
        isDeal: roundState.isDeal,
        randomCard: randomCardToStart,
        triggerDeal: triggerDeal,
        // addResult: addResult,
    }

    return <RoundContext.Provider value={roundContext}>
        {props.children}
    </RoundContext.Provider>
}

export default RoundProvider;