import React, {useState} from 'react'
import HomeStyles from './HomeStyles'
import NavBar from '../NavBar/NavBar'
import '../LoginModal/LoginModal.css'
import Login from './LoginButtonModal'

function Home() {
    const [modal, setModal] = useState(false)
    function openModal() {
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }
    return (
        <>
        <NavBar openModal={openModal} closeModal={closeModal} />
        {modal?
          <Login closeModal={closeModal} />
                :
                null
        }
        </>
    )
}

export default Home