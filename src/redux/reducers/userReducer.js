
const initialState = {
    firstName: '',
    lastName: '',
    roomID: '',
    id: '',
    email: '',
    createdRoom: false
}

const SET_NAME = 'SET_NAME'
const JOIN_ROOM = 'JOIN_ROOM'
const RESET = 'RESET'
const CREATE_ROOM = 'CREATE_ROOM'

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
        case CREATE_ROOM:
            return {
                ...state,
                createdRoom: true
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

export const createRoom = () => {
    return {
        type: CREATE_ROOM
    }
}

export const resetRedux = () => {
    return {
        type: RESET
    }
}

export default reducer