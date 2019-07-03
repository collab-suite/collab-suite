import React, {useState} from 'react'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'
import './LoginModal.css'

function Login(props){
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const dispatch = useDispatch()
    // function handleSubmit(e){
    //     e.preventDefault()
    //     axios.post('/auth/login', {email, password})
    //     .then(res => {
    //         dispatch(setName(res.data))
    //         setEmail('')
    //         setPassword('')
    //     })
    //     .catch(err => {
    //     })
    // }


    return(
        <>
            <button className='login-btn' onClick={e => props.openModal()}>Login</button>
        </>
    )
}

export default Login