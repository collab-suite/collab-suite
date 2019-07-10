import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import NavBar from '../NavBar/NavBar'
import swal from '@sweetalert/with-react'
import './ProfilePage.css'
import Logo from '../../images/AllThinkLogo.png'

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
                    content: (
                        <h1>Password Changed!</h1>
                    ),
                    icon: 'success',
                })
                setEdit(false)
            })
            .catch(err => {
                swal({
                    content: (
                        <h1>Error occured</h1>
                    ),
                    icon: 'error'
                })
            })
        }
    }
    return(
        <div>
            {!edit?
                <div className='profile-page'>
                    <button className='profile-x-btn' onClick={e => props.history.push('/')}>Back to Home</button>
                    <div className='profile-module'>
                        <img className='profile-logo' src={Logo} height='150' width='150' />
                        <h3 className='profile-header'>First name: {user.firstName}</h3>
                        <h4 className='profile-header'>Last name: {user.lastName}</h4>
                        <h4 className='profile-header'>Email: {user.email}</h4>
                        <div className='profile-btn-container'>
                            <button className='profile-btn'>Update Profile</button>
                            <button className='profile-btn' onClick={e => setEdit(true)}>Change Password</button>
                        </div>
                    </div>
                </div>
                :
                <div className='profile-page'>
                    <div className='password-module'>
                        <form className='profile-form' onSubmit={e => changePass(e)}>
                            <img className='profile-pass-logo' src={Logo} height='150' width='150' />
                            <label className='field a-field a-field_a2 page__field'>
                                <input className='field__input a-field__input' placeholder='for security purposes' type='password' required={true} value={curPass} onChange={e => setCurPass(e.target.value)} />
                                <span className='a-field__label-wrap'>
                                    <span className='a-field__label'>Confirm Current Password</span>
                                </span>
                            </label>
                            <label className='field a-field a-field_a2 page__field'>
                                <input className='field__input a-field__input' placeholder='keep it secret' type='password' value={newPass} onChange={e => setNewPass(e.target.value)} />
                                <span className='a-field__label-wrap'>
                                    <span className='a-field__label'>New Password</span>
                                </span>
                            </label>
                            <label className='field a-field a-field_a2 page__field'>
                                <input className='field__input a-field__input' placeholder='keep it safe' type='password' value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                                <span className='a-field__label-wrap'>
                                    <span className='a-field__label'>Confirm New Password</span>
                                </span>
                            </label>
                            <div className='pass-btn-container'>
                                <button className='profile-pass-btn'>Change Password</button>
                            </div>
                        </form>
                    </div>
                    </div>
            }
        </div>
    )
}

export default ProfilePage