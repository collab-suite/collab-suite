import React, {useState, useEffect} from 'react'
import Chat from './Chat/Chat'


function DrawingRoom(props) {
    return (
        //Put whiteboard Component Here
        <Chat socket={props.socket} />
    )
}

export default DrawingRoom