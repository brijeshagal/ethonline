import React from 'react'
// import { BsPlusLg } from 'react-icons/bs';
type props = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}
const PutAdBtn = ({ setShowForm }: props) => {
    return (
        <button onClick={() => setShowForm(true)} className='bg-primary p-4 rounded flex items-center justify-center w-80 '>
            {/* <BsPlusLg className="my-auto mr-4 text-3xl text-whitesmoke" /> */}
            +
            <span>
                Advertise
            </span>
        </button>
    )
}

export default PutAdBtn