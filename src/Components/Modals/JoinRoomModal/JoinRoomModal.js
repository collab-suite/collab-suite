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
            <div className='page__demo' onClick={e => e.stopPropagation()}>
                <form onSubmit={e => handleJoin(e)}>
                    <input placeholder='Room ID' value={roomID} onChange={e => setRoomID(e.target.value)} />
                    <button>Join Room</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(JoinRoomModal)