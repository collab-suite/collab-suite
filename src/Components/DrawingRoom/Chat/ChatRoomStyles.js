import styled from 'styled-components'

export const ChatContainer = styled.div`
    height: 10%;
    width: 40%;
`

export const ChatRoom = styled.ul`
    list-style: none;
`
export const Message = styled.li`
    padding: 0;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
`

export const Name = styled.h4`
    width: 30%;
    margin: 0;
    display: flex;
`

export const MessageText = styled.p`
    margin: 0;
    display: flex;
    max-width: 70%;
`


export const MessageForm = styled.form`

`

export const ChatInput = styled.input`
    border: none;
    outline: none;
`

export const SendMessage = styled.button`

`