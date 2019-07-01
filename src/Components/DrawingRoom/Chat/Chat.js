import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {ChatContainer, ChatRoom, Message, MessageForm, ChatInput, SendMessage} from './ChatRoomStyles'

function Chat(props) {
    const user = useSelector(reduxState => reduxState.user)
    const [messages, setMessages] = useState([])
    const [chatMessage, setChatMsg] = useState('')
    useEffect(() => {
        const {socket} = props
        socket.emit('join room', user)
        socket.on('message recieved', messages => setMessages(messages))
        socket.on('joined room', )
    })
    function handleSendMessage() {
        let userInfo = {
            message
        }
        socket.emit('message send')
    }
    const messageDisplay = messages.map((ele, i) => {
        return <Message key={i}>{ele.firstName} {ele.lastName}: {ele.message}</Message>
    })
    return (
        <ChatContainer>
            <ChatRoom>
                {messageDisplay}
            </ChatRoom>
            <MessageForm onSubmit={e => e.preventDefault()}>
                <ChatInput value={chatMessage} onChange={e => setChatMsg(e.target.value)} />
                <SendMessage>Send Message</SendMessage>
            </MessageForm>
        </ChatContainer>
    )
}

export default Chat