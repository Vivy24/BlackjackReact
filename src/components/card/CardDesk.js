import {useContext, useEffect} from 'react'

import ComputerCard from './ComputerCard'
import Score from './Score'
import PlayerCard from './PlayerCard'

import roundContext from '../../store/round'

const CardDesk = () => {
    const roundCtx = useContext(roundContext);

    
    useEffect(()=>{
        roundCtx.randomCard();
        roundCtx.addResult('C');
        roundCtx.addResult('P');
        console.log(roundCtx);
    },[])

    return (
        <div>
            <ComputerCard/>
            <Score />
            <PlayerCard />
        </div>
    )
}

export default CardDesk
