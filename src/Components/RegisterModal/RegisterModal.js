import React, {useState} from 'react'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'
import swal from '@sweetalert/with-react'
import * as Styles from './RegisterModalStyles'

function Register(){
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
            console.log(swal.getState())
            swal.close()
            dispatch(setName(res.data))
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        })
        .catch(err => {
            alertRegister('error')
        })
    }
    function changeName(name) {
        console.log(name.target.value)
        setFirstName(name.target.value)
    }
    function alertRegister(swalIcon) {
        return swal({
            content: (
                <form onSubmit={e => e.preventDefault()}>
                    <input
                        placeholder='first name'
                        type='text' 
                        required={true}
                        onChange={changeName}
                    />
                    <input
                        name='last name'
                        placeholder='last name'
                        type='text'
                        required={true} 
                        onChange={e => setLastName(e.target.value)}
                    />
                    <input
                        name='email'
                        placeholder='email'
                        type='email' 
                        required={true}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        name='password'
                        placeholder='password'
                        type='password'
                        required={true} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Register</button>
                </form>
            ),
            buttons: false,
            icon: swalIcon
        })
    }
    return(
        <button onClick={() => alertRegister('')}>Register</button>
    )
}

export default Register