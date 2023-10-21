import React, { useEffect } from 'react';
import { putAd, impressionsToClicksRatio } from '@/utils/contractInteractions';
import { Web3Storage } from 'web3.storage';
import { getNetwork } from '@wagmi/core';
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
type props = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}
const PutAd: React.FC<props> = ({ setShowForm }: props) => {
    const { chain } = getNetwork();
    console.log(chain);
    const [loadingMsg, setLoadingMsg] = React.useState('');
    const [isUploading, setIsUploading] = React.useState(false);
    const [adName, setAdName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [noOfClicks, setNoOfClicks] = React.useState<string>("1000");
    const [noOfImpressions, setNoOfImpressions] = React.useState<string>("1000000");
    const [category, setCategory] = React.useState<number>(0);
    const [isPermanent, setIsPermanent] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>('');
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            const ratio = await impressionsToClicksRatio();
            const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE });
            const fileInput = document.getElementById('dwebfiles') as HTMLInputElement;
            console.log(fileInput?.files);
            if (fileInput && adName && description && noOfClicks && noOfImpressions && BigInt(noOfImpressions) >= BigInt(noOfClicks) * BigInt(ratio)) {
                setLoadingMsg('Uploading to ipfs');
                const rootCid = await client.put(fileInput?.files, {
                    name: adName,
                    maxRetries: 3,
                });
                console.log(rootCid);
                // const rootCid = 'bafybeia7d3qmtqunuxme4sq3tkgjtt3q5fhatzhdgmcozkoskyetcm52ru';
                setLoadingMsg('Waiting for wallet confirmation..');
                const hash = await putAd(noOfClicks, noOfImpressions, category, description, rootCid, adName, isPermanent);
                console.log(hash);
            }
            else {
                console.log("no file input");
                if (BigInt(noOfImpressions) >= BigInt(noOfClicks) * BigInt(ratio))
                    setErrorMsg("All fields are required.")
                else {
                    setErrorMsg("Impressions need to be atleast 1000 times the clicks");
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        setIsUploading(false);
    };

    return (
        <div className='text-white'>
            <section className="p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
                <button onClick={() => setShowForm(false)} className="text text-white dark:text-white underline underline-offset-4 ">&lt; Get Back{"  "}</button>
                <form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="adname" >Advertisement Name</label>
                            <input required value={adName} onChange={(e) => setAdName(e.target.value)} id="adname" type="text" className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="My Awesome Ad" />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="description">Description</label>
                            <input required id="description" value={description}
                                placeholder='Short Description' onChange={(e) => setDescription(e.target.value)} type="text" className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="clicks">Number of Clicks</label>
                            <input id="clicks" type="number" placeholder='1000'
                                min={1000}
                                onChange={(e) => setNoOfClicks(e.target.value)}
                                value={noOfClicks} className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Number of Impressions</label>
                            <input id="impressions" placeholder='1000000'
                                onChange={(e) => setNoOfImpressions(e.target.value)}
                                value={noOfImpressions} type="number" className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-white">
                                Your multiple ads
                            </label>
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                            <p className="text-white">Drag and Drop or</p>
                                            <input id="file-upload" name="file-upload" type="file" className="flex-1" multiple />
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="category">Select</label>
                            <select id="catefory" onChange={(e) => setCategory(Number(e.target.value))} className=" w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                {categoryOptions.map((category: string, idx: number) => {
                                    return (<option value={idx}>{category}</option>)
                                })}
                            </select>
                            <div className='flex mt-8 ml-2'>
                                <label className="text-white dark:text-gray-200" htmlFor="isPermanent">Make Your AD Permanent
                                    <input id="isPermanent"
                                        onChange={(e) => setIsPermanent(e.target.checked)}
                                        value={noOfImpressions} type="checkbox" className="w-fit px-4 py-2 mt-2 ml-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-fit ml-auto justify-end mt-6">
                        <div className='w-fit my-auto mr-8 text-red-400'>{errorMsg}</div>
                        <button type="submit" onClick={handleClick} id="submit"
                            className="px-6 ml-auto w-40 py-2 leading-5 text-white transition-colors duration-200 
                        transform bg-purple-600 
                        rounded-md hover:bg-secondary 
                        focus:outline-none ">Lets Roll</button>
                    </div>
                </form>
            </section>
            {isUploading && <div className=''>{loadingMsg}</div>}
        </div>
    );
};

export default PutAd;
