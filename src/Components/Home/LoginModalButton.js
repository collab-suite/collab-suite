import React from 'react'
import '../Modals/LoginModal/LoginModal.css'

function Login(props){
    return(
        <>
            <button className='login-btn' onClick={e => props.openModal()}>Login</button>
        </>
    )
}

export default Login