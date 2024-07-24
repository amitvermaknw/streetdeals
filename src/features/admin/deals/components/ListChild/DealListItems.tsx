import { ProductListProps } from "../../../../../utils/Types";
import '../../../../../assets/products.css';
import { useState } from "react";
import EditDeals from "../EditDeal";
import Review from "../../../../../components/ui/Review";

type Props = {
    deals: ProductListProps,
    deleteRecords: (pid: string, imageUrl: string) => void
};

const DealListItem = ({ deals, deleteRecords }: Props) => {
    const [isLoading, setLoading] = useState(false);

    const checkProduct = (url: string) => {
        window.open(url, '_blank')
    }

    const [dialogStatus, setDialogStatus] = useState(false);
    const [productId, setProductId] = useState('')

    const onDialogClose = () => { setDialogStatus(false) }
    const editProduct = (pid: string) => {
        setDialogStatus(true);
        setProductId(pid);
    }

    const deleteProduct = async (pid: string, pimageurl: string) => {
        setLoading(true);
        await deleteRecords(pid, pimageurl);
        setLoading(false);
    }

    return (<>

        <div className="bg-gray-100 dark:bg-gray-800 py-8 mb-4" key={`${Number(new Date().getMilliseconds())}_${deals.pid}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-non px-4">
                        <div className="h-[250px] rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 flex justify-center items-center">
                            <img className="object-fill h-64 w-80 rounded-lg" src={deals.pimageurl} alt="Product Image" />
                        </div>
                        <div className="flex -mx-2 mb-2">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700"
                                    onClick={() => editProduct(deals.pid)}
                                >Edit</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                                    onClick={() => deleteProduct(deals.documentId ? deals.documentId : '', deals.pimageurl)}
                                >
                                    {isLoading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>Loading...</> : 'Delete'}
                                </button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button
                                    onClick={() => checkProduct(deals.producturl)}
                                    className="w-full bg-green-200 dark:bg-green-700 text-white-800 dark:text-white py-2 px-4 rounded-lg hover:bg-green-300 dark:hover:bg-green-600">Product</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {deals.pname}
                            {
                                deals?.dealstatus?.toLowerCase() === 'active' ?
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 ms-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Active</span>
                                    :
                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 ms-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Inactive</span>
                            }
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {deals.pshortdetails}
                        </p>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mb-4">
                            <div className="col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3 mb-2">
                                {deals.preprice ? <><span className="font-medium text-gray-700 dark:text-gray-300">Last Price:</span>
                                    <button className="text-sm font-medium bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-1 px-4 mx-2 rounded-lg  mr-4 hover:bg-gray-400 dark:hover:bg-gray-600">$ {deals.preprice}</button></> : ''}
                                <span className="font-medium text-gray-700 dark:text-gray-300">Price:</span>
                                <button className="text-sm font-medium bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-1 px-4 mx-2 rounded-lg  mr-4 hover:bg-gray-400 dark:hover:bg-gray-600">$ {deals.price}</button>
                            </div>
                            <div className="col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3">
                                {deals.discount ? <><span className="font-medium text-gray-700 dark:text-gray-300">Discount:</span>
                                    <button className="text-sm font-medium bg-red-500 dark:bg-gray-700 text-white dark:text-white py-1 px-2 mx-2 rounded-lg mr-1 hover:bg-gray-400 dark:hover:bg-gray-600">{deals.discount}%</button></> : ''}
                                {deals.coupon ? <> <span className="font-medium text-gray-700 dark:text-gray-300">Coupon:</span>
                                    <button className="text-sm font-medium bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-1 px-4 mx-2 rounded-lg  mr-4 hover:bg-gray-400 dark:hover:bg-gray-600">{deals.coupon}</button> </> : ''}
                            </div>
                            <div className="col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3">
                                {deals.dealtype ? <><span className="font-medium text-gray-700 dark:text-gray-300">Deal Type:</span>
                                    <button className="text-sm font-medium bg-red-500 dark:bg-gray-700 text-white dark:text-white py-1 px-2 mx-2 rounded-lg mr-1 hover:bg-gray-400 dark:hover:bg-gray-600">{deals.dealtype}</button></> : ''}
                                {deals.ptimeframe ? <> <span className="font-medium text-gray-700 dark:text-gray-300">Time frame:</span>
                                    <button className="text-sm font-medium bg-yellow-300 dark:bg-yellow-700 text-yellow-700 dark:text-white py-1 px-4 mx-2 rounded-lg  mr-4 hover:bg-gray-400 dark:hover:bg-gray-600">{deals.ptimeframe}</button> </> : ''}
                            </div>
                            <div className="col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3">
                                {deals.preview ? <div className="flex">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Review:</span>
                                    <Review props={deals.preview} />
                                </div> : ''}
                            </div>
                            <div className="col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3">
                                {deals.ptimestamp ? <><span className="font-medium text-gray-700 dark:text-gray-300">Created Date:</span>
                                    <button className="text-sm font-medium bg-sky-500 dark:bg-gray-700 text-white dark:text-white py-1 px-2 mx-2 rounded-lg mr-1 hover:bg-gray-400 dark:hover:bg-gray-600">{deals.ptimestamp}</button></> : ''}
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                            <div className="flex items-center mt-2">
                                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                            </div>
                        </div> */}
                        {/* <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                            <div className="flex items-center mt-2">
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                            </div>
                        </div> */}
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <div className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                <div className="pdetails" dangerouslySetInnerHTML={{ __html: deals.productdetails }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {dialogStatus ? <EditDeals onCancel={onDialogClose} productId={productId} onClick={onDialogClose} /> : ''}
    </>
    )
}

export default DealListItem

