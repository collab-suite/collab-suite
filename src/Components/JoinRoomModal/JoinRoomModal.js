import React, {useState} from 'react'
import swal from '@sweetalert/with-react'

function CreateRoomModal(){
    const [roomID, setRoomID] = useState('')
    function joinRoom() {

    }

    function alertJoin() {
        let alert = swal({
            content: (
                <form onSubmit={e => e.preventDefault()}>
                    <input />
                    <button onClick={joinRoom}>Join Room</button>
                </form>
            )
        })
    }
    
    return (
        <button>Join Room</button>
    )
}

export default CreateRoomModal