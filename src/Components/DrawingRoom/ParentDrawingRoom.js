import React from 'react'
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
import ChatRoom from './ChatRoom'
import Canvas from './Canvas'
import styled from 'styled-components'


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
        <PageContainer >
            <CanvasHolder>
                <Canvas socket={socket} />
            </CanvasHolder>
            <ChatHolder>
                {/* <ChatRoom  /> */}
                <ChatRoom socket={socket} />
            </ChatHolder>
        </PageContainer>
        
    )
}


export default ParentDrawingRoom

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    background: red;
    display: flex;
    justify-content: space-around;
    align-items: center;
    `

const CanvasHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    `
const ChatHolder = styled.div`
    width: 400px;
    height: 95%;
    background: yellow;
    `