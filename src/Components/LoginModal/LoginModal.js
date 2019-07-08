import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setName} from '../../../redux/reducers/userReducer'
import './LoginModal.css'
import Logo from '../../images/AllThinkLogo.png'

function LoginButtonModal(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
     function handleSubmit(e){
         console.log(email)
         console.log(password)
        e.preventDefault()
        axios.post('/auth/login', {email, password})
        .then(res => {
            dispatch(setName(res.data))
            setEmail('')
            setPassword('')
            props.closeModal()
        })
        .catch(err => {
        })
    }
    return (
        <div className="page" onClick={props.closeModal} >
            <div className="page__demo" onClick={e => e.stopPropagation()}>
                <img src={Logo} className='login-logo' alt='' height='100' width='120' />
                <form className='login-form' onSubmit={e => e.preventDefault()}>
                    <label className="field a-field a-field_a2 page__field">
                        <input 
                            className="field__input a-field__input" 
                            type="email" 
                            placeholder="e.g. PeterIsAwesome@gmail.com" 
                            required={true} 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <span className="a-field__label-wrap">
                            <span className="a-field__label">Email</span>
                        </span>
                    </label>
                    <label className="field a-field a-field_a2 page__field">
                        <input 
                            className="field__input a-field__input" 
                            placeholder="e.g. Keep it secret, keep it safe" 
                            required={true} 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <span className="a-field__label-wrap">
                            <span className="a-field__label">Password</span>
                        </span>
                    </label>    
                    <button className="login-modal-btn" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginButtonModal