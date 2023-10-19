import React from 'react';
import { registerPlatform } from '@/utils/contractInteractions';
const RegisterPlatformButton: React.FC = ({
}) => {
    const [platformName, setPlatformName] = React.useState('');
    const handleClick = async () => {
        try {
            const hash = await registerPlatform(platformName);
            console.log(hash);
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <input type="text" className='text-black' onChange={(e) => setPlatformName(e.target.value)} />
            <button onClick={handleClick}>
                Register
            </button>
        </div>
    );
};

export default RegisterPlatformButton;
