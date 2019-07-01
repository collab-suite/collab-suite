import React from 'react'
import io from 'socket.io-client'
import DrawingRoom from './DrawingRoom'

function ParentDrawingRoom() {
    const socket = io()
    return (
        <DrawingRoom socket={socket} />
    )
}