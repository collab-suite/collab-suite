import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import swal from '@sweetalert/with-react'
import './ChatRoom.css'
import axios from 'axios';

function Chat(props) {
    const user = useSelector(reduxState => reduxState.user)
    const [messages, setMessages] = useState([])
    const [usersDisp, setUsersDisp] = useState([])
    const [chatMessage, setChatMsg] = useState('')
    const {socket} = props
    let onlineUsers = usersDisp.map((ele, i) => {
        return (
            <li key={i}>{ele.first_name} {ele.last_name.charAt(0)}</li>
        )
    })
    function showUsersOnline() {
        return (
            <ul>
                {onlineUsers}
            </ul>
        )
    }
    useEffect(() => {
        socket.on('message recieved', messages => setMessages(messages))
        socket.on('joined room', (messages, users) => {
            setMessages(messages)
            setUsersDisp(users)
        })
    }, [])
    function showLink() {
        return swal({
            text: `${user.roomID}`
        })
    }
    function showOnline() {
        return swal({
            content: showUsersOnline
        })
    }
    function handleSendMessage() {
        let userInfo = {
            message: chatMessage,
            firstName: user.firstName,
            lastName: user.lastName,
            roomID: user.roomID
        }
        socket.emit('message send', userInfo)
        setChatMsg('')
    }
    function leaveRoom() {
        axios.delete(`/rooms/user?email=${user.email}`)
        .then(res => {
            swal({
                title: 'Left room',
                icon: 'success'
            })
            props.history.push('/')
        })
    }
    function endRoom() {
        axios.delete(`/rooms/end?roomID=${user.roomID}`)
        .then(res => {
            swal({
                title: 'Ended room',
                icon: 'success'
            })
            props.history.push('/')
        })
    }
    console.log(usersDisp)
    const messageDisplay = messages.map((ele, i) => {
        if (ele.first_name === user.firstName && ele.last_name === user.lastName) {
            return (
                <div className='super1' key={i}>
                    <h4 className='msg-header-1'>{ele.first_name} {ele.last_name.charAt(0)} </h4>
                    <li className='u1 msg1'>
                        <p className='msg-text'>{ele.message}</p>
                    </li>
                </div>
            )
        } else {
            return (
                <div className='super2' key={i}>
                    <h4 className='msg-header-2'>{ele.first_name} {ele.last_name.charAt(0)} </h4>
                    <li className='u2 msg2' key={i}>
                        <p className='msg-text-2'>{ele.message}</p>
                    </li>
                </div>
            )
        }
    })
    return (
        <div className='chat-container'>
            <div className='join-room-btn-container'>
                <button onClick={showLink} className='join-room-btn'>Join Room</button>
                {user.createdRoom?
                    <button className='join-room-btn' onClick={endRoom}>End Room</button>
                :
                    <button className='join-room-btn' onClick={leaveRoom}>Leave Room</button>
                }
                <button className='join-room-btn' onClick={showOnline}>Show Users</button>
            </div>
            <ul className='dialogue'>
                {messageDisplay}
            </ul>
            <div className='msg-form-container'>
                <form className='msg-form' onSubmit={e => e.preventDefault()}>
                    <textarea className='msg-input' placeholder='Type your message' value={chatMessage} onChange={e => setChatMsg(e.target.value)} />
                    <button className='msg-btn' onClick={handleSendMessage}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Chat)