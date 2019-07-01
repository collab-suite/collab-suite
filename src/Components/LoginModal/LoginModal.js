import React from 'react'

function Login(){
    return(
        <div>
            <form>
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
                <button>Sign In</button>
                <button>x</button>
            </form>
        </div>
    )
}

export default Login