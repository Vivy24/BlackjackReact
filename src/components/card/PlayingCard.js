import React from 'react'
import Card from '../UI/card'

const PlayingCard = (props) => {
    return (
        <Card>
           <img src ={props.img} alt={props.id} width={150}></img> 
        </Card>
    )
}

export default PlayingCard
