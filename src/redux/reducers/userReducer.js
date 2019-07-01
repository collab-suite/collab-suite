const initialState = {
    firstName: '',
    lastName: '',
    roomID: ''
}

const SET_NAME = 'SET_NAME'
const JOIN_ROOM = 'JOIN_ROOM'

function reducer(state = initialState, action) {
    switch(action.type){
        case SET_NAME:
            return {
                ...state, firstName: action.payload.firstName, lastName: action.payload.lastName
            }
        case JOIN_ROOM:
            return {
                ...state, roomID: action.payload
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

export default reducer