import { Link } from "react-router-dom"
import { BannerListProps } from "../../../../../utils/Types"
import { useState } from "react"

type Props = {
    banner: BannerListProps
    deleteBannerRecord: (bid: string, imageUrl: string) => void
}

const BannerListItem = ({ banner, deleteBannerRecord }: Props) => {

    const [isLoading, setLoading] = useState(false);

    const deleteBanner = async (pid: string, pimageurl: string) => {
        setLoading(true);
        await deleteBannerRecord(pid, pimageurl);
        setLoading(false);
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8 mb-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-non px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {banner.bname}
                            {
                                banner?.bstatus === 'active' ?
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 ms-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Active</span>
                                    :
                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 ms-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Inactive</span>
                            }
                        </h2>

                        <div className="h-[250px] rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 flex justify-center items-center">
                            <Link to={banner.bannerurl} target="_blank" ><img className="object-cover h-60 w-full rounded-lg" src={banner.bimageurl} alt="Product Image" /></Link>
                        </div>
                        <div className="flex -mx-2 mb-2">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Edit</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                                    onClick={() => deleteBanner(banner.documentId, banner.bimageurl)}
                                >{isLoading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>Loading...</> : 'Delete'}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BannerListItem