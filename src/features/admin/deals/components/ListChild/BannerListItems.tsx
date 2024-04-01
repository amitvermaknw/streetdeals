import { Link } from "react-router-dom"
import { BannerListProps } from "../../../../../utils/Types"

type Props = {
    banner: BannerListProps
}

const BannerListItem = ({ banner }: Props) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8 mb-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-non px-4">
                        <div className="h-[250px] rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 flex justify-center items-center">
                            <Link to={banner.url} ><img className="object-cover h-60 w-80 rounded-lg" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" /></Link>
                        </div>
                        <div className="flex -mx-2 mb-2">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Edit</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Delete</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BannerListItem