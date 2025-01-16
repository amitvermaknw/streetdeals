import { useEffect } from "react";
import useProductDetails from "../hooks/useProductDeatails";
import YouMayLike from "./YouMightLike";
import GetDealsDetailModel from "../../../model/GetDealsDetailModel";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Skeleton from "../../../components/ui/Skeleton";
import { toast } from "react-toastify";
import Review from "../../../components/ui/Review";
import usePageSeo from "../../../hooks/usePageSeo";
import PComments from "./PComments";
import WishListWidget from "../../users/wishlist/component/WishListWidget";


const PDetails = () => {
    const [pstate, getDealDetails] = useProductDetails(GetDealsDetailModel);
    const { pid } = useParams();
    const navigate = useNavigate();


    const mode = import.meta.env;
    const baseUrl = mode.DEV === true ? import.meta.env.VITE_BASE_LOCAL_URL : import.meta.env.VITE_BASE_PROD_URL;

    const getDeals = (pid: string | undefined) => {
        getDealDetails(pid);
    }

    useEffect(() => {
        getDeals(pid);
    }, []);

    usePageSeo({
        title: pstate.pname,
        description: pstate.productdetails,
        keywords: [pstate.pcategory],
        ogTitle: pstate.pname,
        ogDescription: pstate.productdetails,
        ogImage: pstate.pimageurl,
        ogUrl: `${baseUrl}${useLocation().pathname}`
    })

    const copyCoupon = (coupon: string) => {
        navigator.clipboard.writeText(coupon);
        toast.success("Coupon copied");
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        pstate.pname ? <>
            <div className="font-[sans-serif]">
                <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto mb-16">
                    <div className="grid items-start grid-cols-2 lg:grid-cols-2 gap-12">
                        <div className="lg:col-span-1 w-full lg:sticky top-0 text-left">
                            <button type="button"
                                onClick={() => goBack()}
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                Back</button>
                        </div>
                        <div className="lg:col-span-1 w-full lg:sticky top-0 text-right">
                            <WishListWidget pId={pstate.pid} />
                        </div>

                    </div>

                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
                            <img src={pstate.pimageurl} alt="Product" className="w-4/5 rounded object-cover" />
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold text-gray-800">{pstate.pname}</h2>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {pstate.preprice ? <p className="text-gray-400 text-xl"><del>${pstate.preprice}</del></p> : ''}
                                <p className="text-green-600 text-xl font-bold">${pstate.price}</p>
                                {pstate.ptimeframe ? <div className="mr-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2 xl:mb-2">{pstate.ptimeframe}</div> : ''}
                                {pstate.discount ? <div className="mr-2  rounded-2xl bg-yellow-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2 xl:mb-2">- {pstate.discount}% off</div> : ''}
                                <span className="text-sm ml-1 text-gray-400 mb-4">Deal can be end anytime.</span>
                            </div>
                            {pstate.preview ? <Review props={pstate.preview} /> : ''}
                            <div className="mt-8">
                                {pstate.coupon ? <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
                                    Coupon: <a href="#"
                                        onClick={() => copyCoupon(pstate.coupon as string)}
                                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">
                                        {pstate.coupon}
                                    </a>
                                    <span
                                        onClick={() => copyCoupon(pstate.coupon as string)}
                                        className="text-sm ml-1 text-gray-400" >Click here to copy</span>
                                </p> : ''}
                            </div>
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-gray-800">About this product</h3>
                                <div className="pdetails p-4 text-sm" dangerouslySetInnerHTML={{ __html: pstate.productdetails }} />
                            </div>

                            <div className="mt-2 max-w-md">
                                <button type="button"
                                    className="w-full mt-2 mb-4 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                                    onClick={() => window.open(pstate.producturl, '_blank')}
                                >Get this deal</button>
                            </div>
                            <div className="space-y-3 list-disc mt-4 text-sm text-gray-800">
                                <strong>*</strong> The Discount deal may earn a small commission through affiliate links on this page. Prices quoted are subject to change at any time, and supplies may be limited. Coupon codes or other offers may be modified or removed at any time.
                            </div>
                        </div>
                    </div>
                </div>
                <PComments {...pstate} />
                <hr className="mt-8 mb-4"></hr>
                <YouMayLike category={pstate.pcategory} />
            </div > </> : <Skeleton />
    )
}

export default PDetails;