import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {ChatContainer, ChatRoom, Message, MessageForm, ChatInput, SendMessage, Name, MessageText} from './ChatRoomStyles'

function Chat(props) {
    const user = useSelector(reduxState => reduxState.user)
    const [messages, setMessages] = useState([])
    const [chatMessage, setChatMsg] = useState('')
    const {socket} = props
    useEffect(() => {
        socket.emit('join room', user)
        socket.on('message recieved', messages => setMessages(messages))
        socket.on('joined room', )
    })
    function handleSendMessage() {
        let userInfo = {
            message: chatMessage,
            firstName: user.firstName,
            lastName: user.lastName,
            roomID: user.roomID
        }
        socket.emit('message send', userInfo)
    }
    const messageDisplay = messages.map((ele, i) => {
        return (
            <Message key={i}>
                <Name>{ele.firstName} {ele.lastName}: </Name>
                <MessageText>{ele.message}</MessageText>
            </Message>
        )
    })
    return (
        <ChatContainer>
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