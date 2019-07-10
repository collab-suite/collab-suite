import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import NavBar from '../NavBar/NavBar'
import swal from '@sweetalert/with-react'

function ProfilePage(props){
    const user = useSelector(reduxState => reduxState.user)
    const [edit, setEdit] = useState(false)
    const [curPass, setCurPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    function changePass(e) {
        e.preventDefault()
        if (newPass === confirmPass) {
            axios.put('/auth/pass', {curPass, newPass, user})
            .then(res => {
                swal({
                    title: 'Password changed',
                    icon: 'success',
                })
                setEdit(false)
            })
            .catch(err => {
                swal({
                    title: 'Error occured',
                    icon: 'error'
                })
            })
        }
    }
    return(
        <div>
            {!edit?
                <>
                    <h1>First name: {user.firstName}</h1>
                    <h2>Last name: {user.lastName}</h2>
                    <h4>Email: {user.email}</h4>
                    <button>Update Profile</button>
                    <button onClick={e => setEdit(true)}>Change Pass</button>
                    <button onClick={e => props.history.push('/')}>X</button>
                </>
                :
                <form onSubmit={e => changePass(e)}>
                    <input type='password' required={true} value={curPass} onChange={e => setCurPass(e.target.value)} />
                    <input type='password' value={newPass} onChange={e => setNewPass(e.target.value)} />
                    <input type='password' value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                    <button>Change Pass</button>
                </form>
            
            }
        </div>
    )
}

export default ProfilePage