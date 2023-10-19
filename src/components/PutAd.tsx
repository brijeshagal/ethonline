import React, { useEffect } from 'react';
import { putAd } from '@/utils/contractInteractions';
import { OutsideClick } from 'outsideclick-react';
import { Web3Storage } from 'web3.storage';
const categoryOptions = ['Art',
    'Music',
    'Photography',
    'Food',
    'Fitness',
    'Fashion',
    'Tech',
    'Travel',
    'Sports',
    'Other'];

const PutAd: React.FC = ({
}) => {
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE });
    const [cid, setCid] = React.useState('');
    const [loadingMsg, setLoadingMsg] = React.useState('');
    const [isUploading, setIsUploading] = React.useState(false);
    const [adName, setAdName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [noOfClicks, setNoOfClicks] = React.useState<string>("1000");
    const [noOfImpressions, setNoOfImpressions] = React.useState<string>("1000000");
    const [categories, setCategories] = React.useState<Array<number>>([]);
    const [options, setOptions] = React.useState<Array<number>>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [showOptions, setShowOptions] = React.useState<boolean>(false);

    const handleClicksUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoOfClicks(e.target.value);
    }
    const handleImpressionsUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoOfImpressions(e.target.value);
    }
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            const fileInput = document.getElementById('dwebfiles') as HTMLInputElement;
            console.log(fileInput?.files);

            if (fileInput) {
                setLoadingMsg('Uploading to ipfs');
                const rootCid = await client.put(fileInput?.files, {
                    name: adName,
                    maxRetries: 3,
                });
                console.log(rootCid);
                // const rootCid = 'bafybeia7d3qmtqunuxme4sq3tkgjtt3q5fhatzhdgmcozkoskyetcm52ru';
                setLoadingMsg('Waiting for wallet confirmation..');
                const hash = await putAd(noOfClicks, noOfImpressions, categories, description, rootCid);
                console.log(hash);
            }
            else {
                console.log("no file input");
            }
        }
        catch (e) {
            console.log(e);
        }
        setIsUploading(false);
    };
    const updateCategories = (newCategory: number) => {
        setCategories((prev) => [...prev, newCategory]);
        const newOptions = options.filter((option) => option !== newCategory);
        setOptions(newOptions);
    }
    const handleRemoveOptions = (category: number) => {
        const newCatgories = categories.filter((cat) => cat !== category);
        setCategories(newCatgories);
        setOptions((prev) => [...prev, category]);
    }
    return (
        <OutsideClick onOutsideClick={() => setShowOptions(false)}>
            <div className='text-white'>
                <form  >
                    <input
                        type="number"
                        required
                        placeholder='Number of clicks'
                        min={1000}
                        onChange={(e) => handleClicksUpdate(e)}
                        value={noOfClicks}
                        className="text-black"
                    />
                    <input
                        type="number"
                        required
                        placeholder='Number of impressions'
                        min={1000000}
                        onChange={(e) => handleImpressionsUpdate(e)}
                        value={noOfImpressions} className="text-black"
                    />
                    <input
                        type="text"
                        required className=''
                        placeholder='Ad Name'
                        value={adName}
                        onChange={(e) => setAdName(e.target.value)}
                    />

                    <input
                        type="text"
                        required
                        className=''
                        placeholder='Short Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className='w-fit h-fit' id="categoryOptions">
                        <div className='' onClick={() => setShowOptions(true)}>
                            {categories.length === 0 && <div className=''>Select Categories</div>}
                            <div className='flex'>
                                {categories.map((idx: number) => {
                                    return (<div key={idx} onClick={() => handleRemoveOptions(idx)}>{categoryOptions[idx]}<span>X</span></div>);
                                })}
                            </div>
                        </div>
                        <div className='absolute w-fit h-fit'>

                            {showOptions && options.map((idx: number) => {
                                return (
                                    <div key={idx} onClick={() => updateCategories(idx)} className='cursor-pointer'>{categoryOptions[idx]}</div>
                                );
                            })}
                        </div>
                    </div>
                    <input type="file" required id="dwebfiles" multiple className='' />
                    <button disabled type="submit" className='' onClick={(e) => handleClick(e)} >
                        PutAd
                    </button>
                </form>
                {isUploading && <div className=''>{loadingMsg}</div>}
            </div>
        </OutsideClick >
    );
};

export default PutAd;
