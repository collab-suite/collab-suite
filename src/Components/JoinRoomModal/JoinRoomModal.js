import React, {useState} from 'react'
import swal from '@sweetalert/with-react'

function CreateRoomModal(){
    const [roomID, setRoomID] = useState('')
    function joinRoom() {

    }

    function alertJoin(swalIcon) {
        let alert = swal({
            content: (
                <form onSubmit={e => e.preventDefault()}>
                    <input />
                    <button onClick={joinRoom}>Join Room</button>
                </form>
            ),
            buttons: false,
            icon: swalIcon
        })
    }
    
    return (
        <button onClick={() => alertJoin('')}>Join Room</button>
    )
}

export default CreateRoomModal