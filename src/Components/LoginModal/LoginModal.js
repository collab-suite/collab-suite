import React, {useState} from 'react'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'
import * as Styles from './LoginModalStyles'
import swal from '@sweetalert/with-react'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    function handleSubmit(e){
        e.preventDefault()
        axios.post('/auth/login', {email, password})
        .then(res => {
            dispatch(setName(res.data))
            setEmail('')
            setPassword('')
        })
        .catch(err => {
            swal.close()
            alertLogin('error')
        })
    }
    function alertLogin(swalIcon) {
        let alert = swal({
            content: (
                <Styles.ModalContainer>
                    <Styles.LoginForm onSubmit={handleSubmit}>
                        <Styles.LoginHeader>Login</Styles.LoginHeader>
                        <Styles.LoginInput placeholder='Email' type='email' required={true} onChange={e => setEmail(e.target.value)} />
                        <Styles.LoginInput placeholder='Password' type='password' required={true} onChange={e => setPassword(e.target.value)} />
                        <Styles.LoginBtn>Login</Styles.LoginBtn>
                    </Styles.LoginForm>
                </Styles.ModalContainer>
            ),
            buttons: false,
            icon: swalIcon
            
        })
        return alert
    }
    return(
        <button onClick={e => alertLogin('')}>Login</button>
    )
}

export default Login