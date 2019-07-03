import React from 'react'
import * as Styles from './NavBarStyles'
import {useSelector, useDispatch} from 'react-redux'
import {resetRedux} from '../../redux/reducers/userReducer'
import axios from 'axios'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'

function NavBar(props){
    const user = useSelector(reduxState => reduxState.user)
    const dispatch = useDispatch()
    function logout(){
        axios.get('/auth/logout')
        .then(res => {
            dispatch(resetRedux())
        })
    }
    return(
        <Styles.NavBarHeader>
            <Styles.NavBarOrganizer>
                
                {!user.email?
                    <Styles.ButtonHolder>
                        <Styles.LineBeforeOne></Styles.LineBeforeOne>
                        <LoginModal />
                        <Styles.Logo src={require('../../images/AllThinkLogo.png')} alt="dope-logo" />
                        <RegisterModal />
                        <Styles.LineAfterOne></Styles.LineAfterOne>
                    </Styles.ButtonHolder>
                    :
                    <Styles.ButtonHolderTwo>
                        <Styles.LineBeforeTwo></Styles.LineBeforeTwo>
                        <Styles.NavButtonTwo>Profile</Styles.NavButtonTwo>
                        <Styles.NavButtonTwo>Create Room</Styles.NavButtonTwo>
                        <Styles.Logo src={require('../../images/AllThinkLogo.png')} alt="dope-logo" />
                        <Styles.NavButtonTwo>Join Room</Styles.NavButtonTwo>
                        <Styles.NavButtonTwo onClick={logout}>Logout</Styles.NavButtonTwo>
                        <Styles.LineAfterTwo></Styles.LineAfterTwo>
                    </Styles.ButtonHolderTwo>
                }
            </Styles.NavBarOrganizer>
        </Styles.NavBarHeader>
    )
}

export default NavBar