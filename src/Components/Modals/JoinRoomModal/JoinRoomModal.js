import React, {useState} from 'react'
import {joinRoom} from '../../../redux/reducers/userReducer'
import {withRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './JoinRoomModal.css'

function JoinRoomModal(props){
    const dispatch = useDispatch()
    const [roomID, setRoomID] = useState('')
    function handleJoin(e) {
        e.preventDefault()
        dispatch(joinRoom(roomID))
        props.history.push('/draw')
    }
    return (
        <div className='page' onClick={props.closeRoomModal}>
            <div onClick={e => e.stopPropagation()}>
                <form className='room-container' onSubmit={e => handleJoin(e)}>
                    <h1 className='room-header'>What do you need?</h1>
                    <label className='field-number a-field-number a-field_a2-number page__field-number'>
                        <input
                            className='field__input-number a-field__input-number'
                            type='text' 
                            placeholder='e.g. 011235813' 
                            required={true}
                            value={roomID} 
                            onChange={e => setRoomID(e.target.value)} 
                        />
                        <span className='a-field__label-wrap-number'>
                            <span className='a-field__label-number'>Room ID</span>
                        </span>
                    </label>
                    <div className='room-btn-container'>
                        <button className='room-btn'>Create Room</button>
                        <button className='room-btn'>Join Room</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(JoinRoomModal)