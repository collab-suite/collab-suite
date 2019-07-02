import { bindActionCreators } from "redux";

const initialState = {
    firstName: '',
    lastName: '',
    roomID: '',
    id: '',
    email: ''
}

const SET_NAME = 'SET_NAME'
const JOIN_ROOM = 'JOIN_ROOM'
const RESET = 'RESET'

function reducer(state = initialState, action) {
    switch(action.type){
        case SET_NAME:
            return {
                ...state, firstName: action.payload.firstName, lastName: action.payload.lastName,
                id: action.payload.id,
                email: action.payload.email
            }
        case JOIN_ROOM:
            return {
                ...state, roomID: action.payload
            }
        case RESET:
            return {
                ...initialState
            }
        default: 
            return state
    }
}

export const setName = (names) => {
    return {
        type: SET_NAME,
        payload: names
    }
}

export const joinRoom = (roomID) => {
    return {
        type: JOIN_ROOM,
        payload: roomID
    }
}

export const resetReduxs = () => {
    return {
        type: RESET
    }
}

export default reducer