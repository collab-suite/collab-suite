import React, {useState} from 'react'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'
import './RegisterModal.css'
import Logo from '../../images/AllThinkLogo.png'

function Register(props){
    const [name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    function handleSubmit(){
        console.log(name)
        console.log(last_name)
        console.log(email)
        console.log(password)
        axios.post('/auth/register', {name, last_name, email, password})
        .then(res => {
            dispatch(setName(res.data))
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        })
        .catch(err => {
        })
    }
    function changeName(name) {
        console.log(name.target.value)
        setFirstName(name.target.value)
    }
    return(
        <div className='page' onClick={props.closeRegModal}>
                    <div className='register-modal' onClick={e => e.stopPropagation()}>
                        <form className='register-form' onSubmit={e => e.preventDefault()}>
                            <img src={Logo} height='100' width='120' className='register-logo' />
                            <label className='field a-field a-field_a2 page__field'>
                                <input
                                    className='field__input a-field__input'
                                    name='first name'
                                    placeholder='e.g. Harry'
                                    type='text' 
                                    required={true}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                <span className='a-field__label-wrap'>
                                    <span className='a-field__label'>First Name</span>
                                </span>
                            </label>
                            <label className='field a-field a-field_a2 page__field'>
                                <input
                                    className='field__input a-field__input'
                                    name='last name'
                                    placeholder='e.g. Potter'
                                    type='text'
                                    required={true} 
                                    onChange={e => setLastName(e.target.value)}
                                />
                                <span className='a-field__label-wrap'>
                                    <span className='a-field__label'>Last Name</span>
                                </span>
                            </label>
                            <label className='field a-field a-field_a2 page__field'>
                                <input
                                    className='field__input a-field__input'
                                    name='email'
                                    placeholder='e.g. awesome@email.com'
                                    type='email' 
                                    required={true}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <span className='a-field__label-wrap'>
                                    <span className='a-field__label'>Email</span>
                                </span>
                            </label>
                            <label className='field a-field a-field_a2 page__field'>
                                <input 
                                    className='field__input a-field__input'
                                    name='password'
                                    placeholder='keep it secret, keep it safe'
                                    type='password'
                                    required={true} 
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <span className='a-field__label-wrap'>
                                    <span className='a-field__label'>Password</span>
                                </span>
                            </label>
                            <button className='register-btn' onClick={handleSubmit}>Register</button>
                        </form>
                    </div>
                </div>
    )
}

export default Register