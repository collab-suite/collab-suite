import React, {useState} from 'react'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'
import swal from '@sweetalert/with-react'
import './LoginModal.css'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    function handleSubmit(e){
        e.preventDefault()
        axios.post('/auth/login', {email, password})
        .then(res => {
            swal.close()
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
                <div className='modal-container'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='login-header'>Login</h1>
                        <label className='field a-field_a1 page__field'>
                            <input className="field__input a-field__input" placeholder='e.g. PeterIsAwesome@gmail.com' type='email' required={true} onChange={e => setEmail(e.target.value)} />
                            <span className="a-field__label-wrap">
                                <span className="a-field__label">Email</span>
                            </span>
                        </label>
                        <label className='field a-field_a2 page__field'>
                            <input className="field__input a-field__input" placeholder='Keep it secret, keep it safe' type='password' required={true} onChange={e => setPassword(e.target.value)} />
                            <span className="a-field__label-wrap">
                                <span className="a-field__label">Password</span>
                            </span>
                        </label>
                        <button className='login-btn'>Login</button>
                    </form>
                </div>
            ),
            buttons: false,
            icon: swalIcon
            
        })
        return alert
    }
    return(
        <button className='login-btn' onClick={e => alertLogin('')}>Login</button>
    )
}

export default Login