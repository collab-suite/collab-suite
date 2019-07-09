import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import swal from '@sweetalert/with-react'
import './ChatRoom.css'

function Chat(props) {
    const user = useSelector(reduxState => reduxState.user)
    const [messages, setMessages] = useState([])
    const [usersDisp, setUsersDisp] = useState([])
    const [chatMessage, setChatMsg] = useState('')
    const {socket} = props
    const onlineUsers = usersDisp.map((ele, i) => {
        return (
            <li key={i}>{ele.first_name} {ele.last_name.charAt(0)}</li>
        )
    })
    useEffect(() => {
        socket.on('message recieved', messages => setMessages(messages))
        socket.on('joined room', (messages, users) => {
            setMessages(messages)
            setUsersDisp(users)
        })
    }, [])
    function showLink() {
        return swal({
            content: (
                <h4>{user.roomID}</h4>
            )
        })
    }
    function showOnline() {
        return swal({
            content: (
                <ul>
                    {onlineUsers}
                </ul>
            )
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
                <button className='join-room-btn'>End Room</button>
                <button className='join-room-btn'>Show Users</button>
            </div>
            <ul className='dialogue'>
                {messageDisplay}
            </ul>
            <div className='msg-form-container'>
                <form className='msg-form' onSubmit={e => e.preventDefault()}>
                    <input className='msg-input' value={chatMessage} onChange={e => setChatMsg(e.target.value)} />
                    <button className='msg-btn' onClick={handleSendMessage}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat