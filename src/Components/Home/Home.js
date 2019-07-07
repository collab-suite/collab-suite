import React, {useState} from 'react'
import HomeStyles from './HomeStyles'
import NavBar from '../NavBar/NavBar'
import '../LoginModal/LoginModal.css'
import Login from './LoginButtonModal'
import Reg from '../RegisterModal/RegisterModal'

function Home() {
    const [modal, setModal] = useState(false)
    const [regModal, setRegModal] = useState(false)
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
        <NavBar openModal={openModal} closeModal={closeModal} openRegModal={openRegModal} closeRegModal={closeRegModal} />
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
        </>
    )
}

export default Home