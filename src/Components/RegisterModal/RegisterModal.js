import React, {useState} from 'react'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'
import swal from '@sweetalert/with-react'
import * as Styles from './RegisterModalStyles'

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
        <div onClick={props.closeRegModal}>
                    <div>
                        <form onSubmit={e => e.preventDefault()}>
                            <label>
                                <input
                                    name='first name'
                                    placeholder='e.g. Harry'
                                    type='text' 
                                    required={true}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                <span>
                                    <span>First Name</span>
                                </span>
                            </label>
                            <label>
                                <input
                                    name='last name'
                                    placeholder='e.g. Potter'
                                    type='text'
                                    required={true} 
                                    onChange={e => setLastName(e.target.value)}
                                />
                                <span>
                                    <span>Last Name</span>
                                </span>
                            </label>
                            <label>
                                <input
                                    name='email'
                                    placeholder='e.g. awesome@email.com'
                                    type='email' 
                                    required={true}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <span>
                                    <span>Email</span>
                                </span>
                            </label>
                            <label>
                                <input 
                                    name='password'
                                    placeholder='keep it secret, keep it safe'
                                    type='password'
                                    required={true} 
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <span>
                                    <span>Password</span>
                                </span>
                            </label>
                            <button onClick={handleSubmit}>Register</button>
                        </form>
                    </div>
                </div>
    )
}

export default Register