import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import '../Modals/LoginModal/LoginModal.css'
import Login from '../Modals/LoginModal/LoginModal'
import Reg from '../Modals/RegisterModal/RegisterModal'
import JoinRoom from '../Modals/JoinRoomModal/JoinRoomModal'
import Background from '../Background/Background'

function Home() {
    const [modal, setModal] = useState(false)
    const [regModal, setRegModal] = useState(false)
    const [roomModal, setRoomModal] = useState(false)
    const [visited, setVisited] = useState(false)

    function hasVisited() {
        setVisited(true)
    }
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
        setVisited(true)
    }

    function openRegModal() {
        setRegModal(true)
    }
    function closeRegModal() {
        setRegModal(false)
        setVisited(true)
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
            <JoinRoom closeRoomModal={closeRoomModal} />
            :
            null
        }

        <div style={{width: '100vw', height: '70vh'}}>
            <Background 
              modal={modal}
              regModal={regModal}
              visited={visited}
              hasVisited={hasVisited}/>
        </div>
        </>
    )
}

export default Home