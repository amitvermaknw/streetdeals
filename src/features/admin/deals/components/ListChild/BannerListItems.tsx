import { Link } from "react-router-dom"
import { BannerListProps } from "../../../../../utils/Types"

type Props = {
    banner: BannerListProps
    deleteBannerRecord: (bid: string) => void
}

const BannerListItem = ({ banner, deleteBannerRecord }: Props) => {
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
                                    onClick={() => deleteBannerRecord(banner.documentId)}
                                >Delete</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BannerListItem