import React from 'react'

function UpdateProfile(){
    return(
        <div>
            <form>
                <input
                    name='first name'
                    placeholder='first name'
                    type='text' 
                />
                <input
                    name='last name'
                    placeholder='last name'
                    type='text' 
                />
                <input
                    name='email'
                    placeholder='email'
                    type='text' 
                />
                <input 
                    name='password'
                    placeholder='password'
                    type='text' 
                />
                <button>Update</button>
                <button>x</button>
            </form>
        </div>
    )
}

export default UpdateProfile