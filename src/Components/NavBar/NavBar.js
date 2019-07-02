import React from 'react'
import * as Styles from './NavBarStyles'
import {useSelector, useDispatch} from 'react-redux'
import {resetRedux} from '../../redux/reducers/userReducer'
import axios from 'axios'

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
                <Styles.Logo />
                {user.email?
                    <Styles.ButtonHolder>
                        <Styles.NavButton>Login</Styles.NavButton>
                        <Styles.NavButton>Register</Styles.NavButton>
                    </Styles.ButtonHolder>
                    :
                    <Styles.ButtonHolderTwo>
                        <Styles.NavButton>Profile</Styles.NavButton>
                        <Styles.NavButton>Rooms</Styles.NavButton>
                        <Styles.NavButton onClick={logout}>Logout</Styles.NavButton>
                    </Styles.ButtonHolderTwo>
                }
            </Styles.NavBarOrganizer>
        </Styles.NavBarHeader>
    )
}

export default NavBar