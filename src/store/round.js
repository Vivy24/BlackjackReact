import React from 'react'


const RoundContext = React.createContext({
    cards:[],
    computerCards:[],
    playerCards:[],
    computerPoint:[],
    playerPoint:[],
    isDeal: false,
    // addPlayerCard:()=>{},
    randomCard:()=>{},
    triggerDeal:()=>{},
    addResult:(addType)=>{}
    // resetRound:()=>{},
})

export default RoundContext