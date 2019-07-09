import React, {useState} from 'react'

function UpdateProfile(){
    const [firstName, setFN] = useState('')
    const [lastName, setLN] = useState('')
    const [email, setEmail] = useState('')

    return(
        <div>
            <form>
                <input
                    name='first name'
                    placeholder='first name'
                    type='text' 
                    value={firstName}
                    onChange={e => setFN(e.target.value)}
                />
                <input
                    name='last name'
                    placeholder='last name'
                    type='text' 
                    value={lastName}
                    onChange={e => setLN(e.target.value)}
                />
                <input
                    name='email'
                    placeholder='email'
                    type='text' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button>Update</button>
                <button>x</button>
            </form>
        </div>
    )
}

export default UpdateProfile