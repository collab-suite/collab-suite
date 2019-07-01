import React, {useState, useEffect} from 'react'
import Chat from './Chat/Chat'


function DrawingRoom(props) {
    return (
        <Chat socket={props.socket} />
    )
}

export default DrawingRoom