import React, {useState} from 'react'
import HomeStyles from './HomeStyles'
import NavBar from '../NavBar/NavBar'
import '../LoginModal/LoginModal.css'

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
            <div className="page" onClick={closeModal} >
                    <div className="page__demo" onClick={e => e.stopPropagation()}>
                        <img className='login-logo' src={require('../../images/AllThinkLogo.png')} alt='' />
                        <form>
                            <label className="field a-field a-field_a1 page__field">
                                <input className="field__input a-field__input" type="email" placeholder="e.g. PeterIsAwesome@gmail.com" required={true} />
                                <span className="a-field__label-wrap">
                                    <span className="a-field__label">Email</span>
                                </span>
                            </label>
                            <label className="field a-field a-field_a2 page__field">
                                <input className="field__input a-field__input" placeholder="e.g. Keep it secret, keep it safe" required={true} type="password" />
                                <span className="a-field__label-wrap">
                                    <span className="a-field__label">Password</span>
                                </span>
                            </label>    
                            <button className="login-modal-btn">Login</button>
                        </form>
                    </div>
                </div>
                :
                null
        }
        </>
    )
}

export default Home