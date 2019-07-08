import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {ChatContainer, ChatRoom, Message, MessageForm, ChatInput, SendMessage, Name, MessageText} from './ChatRoomStyles'
import swal from '@sweetalert/with-react'

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
        return (
            <Message key={i}>
                <Name>{ele.first_name} {ele.last_name.charAt(0)}: </Name>
                <MessageText>{ele.message}</MessageText>
            </Message>
        )
    })
    return (
        <ChatContainer>
            <button onClick={showOnline}>Show users in room</button>
            <button onClick={showLink}>Join Link</button>
            <ChatRoom>
                {messageDisplay}
            </ChatRoom>
            <MessageForm onSubmit={e => e.preventDefault()}>
                <ChatInput value={chatMessage} onChange={e => setChatMsg(e.target.value)} />
                <SendMessage onClick={handleSendMessage}>Send Message</SendMessage>
            </MessageForm>
        </ChatContainer>
    )
}

export default Chat