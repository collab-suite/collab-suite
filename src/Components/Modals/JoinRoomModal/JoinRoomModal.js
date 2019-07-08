import React, {useState} from 'react'
import {joinRoom} from '../../../redux/reducers/userReducer'
import {withRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import '../LoginModal/LoginModal.css'

function JoinRoomModal(props){
    const dispatch = useDispatch()
    const [roomID, setRoomID] = useState('')
    function handleJoin(e) {
        e.preventDefault()
        dispatch(joinRoom(roomID))
        props.history.push('/draw')
    }
    return (
        <div className='page'>
            <div className='room-container' onClick={e => e.stopPropagation()}>
                <form onSubmit={e => handleJoin(e)}>
                    <h1 className='room-header'>What do you need?</h1>
                    <input placeholder='Room ID' value={roomID} onChange={e => setRoomID(e.target.value)} />
                    <button className='room-btn'>Create Room</button>
                    <button className='room-btn'>Join Room</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(JoinRoomModal)