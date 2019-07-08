import React, {useEffect} from 'react'
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
import ChatRoom from './ChatRoom'
import Canvas from './Canvas'
import './ParentDrawingRoom.css'

function ParentDrawingRoom(props) {
    const socket = io()
    const user = useSelector(reduxState => reduxState.user)
    socket.on('end room', () => {
        socket.emit('leave room', user.roomID)
        window.alert('Host has closed the room')
        props.history.push('/')
    })
    useEffect(() => {
        socket.emit('join room', user)
        return cleanUp
    }, [])
    function cleanUp () {
        socket.emit('leave room', user)
    }

    return (
        <div className='canvas-page-container' >
            <div className='canvas-holder' >
                <Canvas />
                {/* <Canvas socket={socket} /> */}
            </div>
            <div className='chat-holder' >
                {/* <ChatRoom  /> */}
                <ChatRoom socket={socket} />
            </div>
        </div> 
    )
}


export default ParentDrawingRoom