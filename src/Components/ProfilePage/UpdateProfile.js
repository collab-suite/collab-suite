import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setName} from '../../redux/reducers/userReducer'
import swal from '@sweetalert/with-react'

function UpdateProfile(props){
    const user = useSelector(reduxState => reduxState.user)
    const dispatch = useDispatch()
    const [firstName, setFN] = useState('')
    const [lastName, setLN] = useState('')
    const [email, setEmail] = useState('')
    function updateInfo(e) {
        e.preventDefault()
        axios.put('/auth/update', {firstName, lastName, email, user})
        .then(res => {
            dispatch(setName(res.data))
            swal({
                content: (
                    <h1>Info changed</h1>
                ),
                icon: 'success'
            })
            resetInfo()
        })
    }
    function resetInfo() {
        setFN('')
        setLN('')
        setEmail('')
        props.history.push('/profile')
    }
    useEffect(() => {
        setFN(user.firstName)
        setLN(user.lastName)
        setEmail(user.email)
    },[])
    return(
        <div>
            <form onSubmit={e => updateInfo(e)}>
                <input
                    name='first name'
                    placeholder='first name'
                    type='text' 
                    value={firstName}
                    onChange={e => setFN(e.target.value)}
                />
                <input
                    name='last name'
                    placeholder='last name'
                    type='text' 
                    value={lastName}
                    onChange={e => setLN(e.target.value)}
                />
                <input
                    name='email'
                    placeholder='email'
                    type='email' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type='submit'>Update</button>
                <button type='reset' onClick={e => resetInfo()}>x</button>
            </form>
        </div>
    )
}

export default UpdateProfile