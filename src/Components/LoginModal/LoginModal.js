import React, {useState} from 'react'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    function handleSubmit(){
        axios.post('/auth/login', {email, password})
        .then(res => {
            dispatch(setName(res.data))
            setEmail('')
            setPassword('')
        })
    }

    return(
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <input
                    name='email'
                    placeholder='email'
                    type='email'
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required={true}
                />
                <input 
                    name='password'
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required={true} 
                />
                <button onClick={handleSubmit}>Sign In</button>
            </form>
            <button>x</button>
        </div>
    )
}

export default Login