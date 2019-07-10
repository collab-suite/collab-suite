import React, {useEffect} from 'react'
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
import ChatRoom from './ChatRoom'
import Canvas from './Canvas/Canvas'
import './ParentDrawingRoom.css'
import swal from '@sweetalert/with-react';

function ParentDrawingRoom(props) {
    const socket = io()
    const user = useSelector(reduxState => reduxState.user)
    socket.on('end room', () => {
        if (!user.createdRoom) {
            socket.emit('leave room', user.roomID)
            swal({
                content: (
                    <h1>Host has closed the room</h1>
                ),
                icon: 'warning'
            })
            props.history.push('/')
        }
    })
    useEffect(() => {
        socket.emit('join room', user)
        if (user.createdRoom) {
            return hostCleanUp
        } else {
            return cleanUp
        }
    }, [])
    function cleanUp () {
        socket.emit('leave room', user)
    }
    function hostCleanUp() {
        socket.emit('end room', user)
    }
    console.log(user)
    return (
        <div className='canvas-page-container' >
            <div className='canvas-holder' >
                {/* <Canvas /> */}
                <Canvas socket={socket} />
            </div>
            <div className='chat-holder' >
                {/* <ChatRoom  /> */}
                <ChatRoom socket={socket} />
            </div>
        </div> 
    )
}


export default ParentDrawingRoom