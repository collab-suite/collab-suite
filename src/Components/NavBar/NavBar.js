import React from 'react'
import * as Styles from './NavBarStyles'
import {useSelector, useDispatch} from 'react-redux'
import {resetRedux, joinRoom} from '../../redux/reducers/userReducer'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import LoginModal from '../Home/LoginModalButton'
import RegisterModal from '../Modals/RegisterModal/RegisterModal'

function NavBar(props){
    const user = useSelector(reduxState => reduxState.user)
    const dispatch = useDispatch()
    function logout(){
        axios.get('/auth/logout')
        .then(res => {
            dispatch(resetRedux())
        })
    }
    function createRoom() {
        axios.get('/room/create')
        .then(res => {
            dispatch(joinRoom(res.data))
            props.history.push('/draw')
        })
    }
    return(
        <Styles.NavBarHeader>
            <Styles.NavBarOrganizer>
                
                {!user.email?
                    <Styles.ButtonHolder>
                        <Styles.LineBeforeOne></Styles.LineBeforeOne>
                        <LoginModal openModal={props.openModal} closeModal={props.closeModal} />
                        <Styles.Logo src={require('../../images/AllThinkLogo.png')} alt="dope-logo" />
                        <button onClick={props.openRegModal}>Register</button>
                        <Styles.LineAfterOne></Styles.LineAfterOne>
                    </Styles.ButtonHolder>
                    :
                    <Styles.ButtonHolderTwo>
                        <Styles.LineBeforeTwo></Styles.LineBeforeTwo>
                        <Styles.NavButtonTwo>Profile</Styles.NavButtonTwo>
                        <Styles.NavButtonTwo onClick={createRoom}>Create Room</Styles.NavButtonTwo>
                        <Styles.Logo src={require('../../images/AllThinkLogo.png')} alt="dope-logo" />
                        <Styles.NavButtonTwo onClick={props.openRoomModal}>Join Room</Styles.NavButtonTwo>
                        <Styles.NavButtonTwo onClick={logout}>Logout</Styles.NavButtonTwo>
                        <Styles.LineAfterTwo></Styles.LineAfterTwo>
                    </Styles.ButtonHolderTwo>
                }
            </Styles.NavBarOrganizer>
        </Styles.NavBarHeader>
    )
}

export default withRouter(NavBar)