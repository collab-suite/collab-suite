import React from 'react'
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
import DrawingRoom from './DrawingRoom'

function ParentDrawingRoom(props) {
    const socket = io()
    const user = useSelector(reduxState => reduxState.user)
    socket.on('end room', () => {
        socket.emit('leave room', user.roomID)
        window.alert('Host has closed the room')
        props.history.push('/')
    })
    return (
        <DrawingRoom socket={socket} />
    )
}

export default ParentDrawingRoom