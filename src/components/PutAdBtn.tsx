import React from 'react'
// import { BsPlusLg } from 'react-icons/bs';
type props = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}
const PutAdBtn = ({ setShowForm }: props) => {
    return (
        <button onClick={() => setShowForm(true)} className='bg-purple-600 py-3 ml-auto md:mr-40 rounded flex items-center justify-center w-40 hover:bg-secondary '>
            {/* <BsPlusLg className="my-auto mr-4 text-3xl text-whitesmoke" /> */}
            +
            <span className='ml-2'>
                Advertise
            </span>
        </button>
    )
}

export default PutAdBtn