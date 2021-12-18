import {useContext} from 'react'

import roundContext from '../../store/round'

const Score = () => {
    const roundCtx = useContext(roundContext);

    const dealerPoint = () => {
        if(roundCtx.isDeal) {
            if(!roundCtx.computerCards[0].point){
                return `1, 10`
            }
            else {
               return `${roundCtx.computerCards[0].point}`
            }
        }

        return '0';
    }


    // const playerPoint = () => {
    //     if(roundCtx.isDeal){
    //         if(roundCtx.playerPoint.length > 1){
    //             return `${roundCtx.playerPoint[0]}, ${roundCtx.playerPoint[1]}`
    //         }
    //         return `${roundCtx.playerPoint[0]}`
    //     }
    //     return '0'
    // }

    return (
        <div>
            <h2>Dealer Score: {dealerPoint()} </h2>
            {/* <h2>Player Score: {playerPoint()} </h2> */}
        </div>
    )
}

export default Score
