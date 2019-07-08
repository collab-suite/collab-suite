import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import '../Modals/LoginModal/LoginModal.css'
import Login from '../Modals/LoginModal/LoginModal'
import Reg from '../Modals/RegisterModal/RegisterModal'
import JoinRoom from '../Modals/JoinRoomModal/JoinRoomModal'

function Home() {
    const [modal, setModal] = useState(false)
    const [regModal, setRegModal] = useState(false)
    const [roomModal, setRoomModal] = useState(false)
    function openRoomModal() {
        setRoomModal(true)
    }
    function closeRoomModal() {
        setRoomModal(false)
    }
    function openModal() {
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }

    function openRegModal() {
        setRegModal(true)
    }
    function closeRegModal() {
        setRegModal(false)
    }
    return (
        <>
        <NavBar openModal={openModal} closeModal={closeModal} openRegModal={openRegModal} closeRegModal={closeRegModal} openRoomModal={openRoomModal} closeRoomModal={closeRoomModal} />
        {modal?
          <Login onClick={e => e.stopPropagation()} closeModal={closeModal} />
                :
                null
        }
        {regModal?
            <Reg onClick={e => e.stopPropagation()} closeRegModal={closeRegModal} />
            :
            null
        }
        {roomModal?
            <JoinRoom />
            :
            null
        }
        </>
    )
}

export default Home