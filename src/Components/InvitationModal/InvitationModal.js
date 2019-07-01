import React from 'react'

function Invitation(){
    return(
        <div>
            <form>
                <input 
                    name='email'
                    placeholder='email'
                    type='text'
                />
                <button>Invite</button>
                <button>X</button>
            </form>
        </div>
    )
}

export default Invitation