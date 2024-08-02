import { useEffect } from "react";
import useProductDetails from "../hooks/useProductDeatails";
import YouMayLike from "./YouMightLike";
import GetDealsDetailModel from "../../../model/GetDealsDetailModel";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Skeleton from "../../../components/ui/Skeleton";
import { toast } from "react-toastify";
import Review from "../../../components/ui/Review";
import usePageSeo from "../../../hooks/usePageSeo";

const PDetails = () => {
    const [pstate, getDealDetails] = useProductDetails(GetDealsDetailModel);
    const { pid } = useParams();
    const navigate = useNavigate();

    const mode = import.meta.env;
    const baseUrl = mode.DEV === true ? import.meta.env.VITE_BASE_LOCAL_URL : import.meta.env.VITE_BASE_PROD_URL;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getDeals = (pid: any) => {
        getDealDetails(pid);
    }

    useEffect(() => {
        getDeals(pid);
    }, []);

    // useEffect(() => {
    //     document.title = pstate.pname;
    // }, [pstate.pname]);

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
                <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
                    <button type="button"
                        onClick={() => goBack()}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Back</button>
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
                            <img src={pstate.pimageurl} alt="Product" className="w-4/5 rounded object-cover" />
                            {/* <hr className="border-white border-2 my-6" />
                        <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center mx-auto">
                            <img src="https://readymadeui.com/images/coffee6.webp" alt="Product1" className="w-24 cursor-pointer" />
                            <img src="https://readymadeui.com/images/coffee3.webp" alt="Product2" className="w-24 cursor-pointer" />
                            <img src="https://readymadeui.com/images/coffee4.webp" alt="Product3" className="w-24 cursor-pointer" />
                            <img src="https://readymadeui.com/images/coffee5.webp" alt="Product4" className="w-24 cursor-pointer" />
                        </div> */}
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-extrabold text-gray-800">{pstate.pname}</h2>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {pstate.preprice ? <p className="text-gray-400 text-xl"><del>${pstate.preprice}</del></p> : ''}
                                <p className="text-green-600 text-xl font-bold">${pstate.price}</p>
                                {pstate.ptimeframe ? <div className="mr-2 mb-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2 xl:mb-2">{pstate.ptimeframe}</div> : ''}
                                {pstate.discount ? <div className="mr-2 mb-2 rounded-2xl bg-yellow-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2 xl:mb-2">- {pstate.discount}% off</div> : ''}
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
                                <h3 className="text-lg font-bold text-gray-800">Details</h3>
                                <div className="pdetails" dangerouslySetInnerHTML={{ __html: pstate.productdetails }} />

                                {/* <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                                    <li>A cup of coffee is a beverage essential because of its timeless appeal</li>
                                    <li>Easy to prepare. It can be brewed using various methods, from drip machines to manual pour-overs.</li>
                                    <li>Available in various sizes, from a standard espresso shot to a large Americano, catering to different preferences.</li>
                                    <li>You can customize your coffee by adding cream, sugar, or flavorings to suit your taste preferences.</li>
                                </ul> */}
                            </div>

                            <div className="mt-8 max-w-md">
                                {/* <h3 className="text-lg font-bold text-gray-800">Reviews(10)</h3> */}
                                {/* <div className="space-y-3 mt-4">
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-800 font-bold">5.0</p>
                                    <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                                        <div className="w-2/3 h-full rounded bg-gray-800"></div>
                                    </div>
                                    <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-800 font-bold">4.0</p>
                                    <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                                        <div className="w-1/3 h-full rounded bg-gray-800"></div>
                                    </div>
                                    <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-800 font-bold">3.0</p>
                                    <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                                        <div className="w-1/6 h-full rounded bg-gray-800"></div>
                                    </div>
                                    <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-800 font-bold">2.0</p>
                                    <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                                        <div className="w-1/12 h-full rounded bg-gray-800"></div>
                                    </div>
                                    <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-800 font-bold">1.0</p>
                                    <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                                        <div className="w-[6%] h-full rounded bg-gray-800"></div>
                                    </div>
                                    <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                                </div>
                            </div> */}
                                {/* <div className="flex items-start mt-8">
                                <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                                <div className="ml-3">
                                    <h4 className="text-sm font-bold">John Doe</h4>
                                    <div className="flex space-x-1 mt-1">
                                        <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                        </svg>
                                        <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                        </svg>
                                        <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                        </svg>
                                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                        </svg>
                                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                        </svg>
                                        <p className="text-xs !ml-2 font-semibold">2 mins ago</p>
                                    </div>
                                    <p className="text-xs mt-4">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                                </div>
                            </div> */}
                                <button type="button"
                                    className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                                    onClick={() => window.open(pstate.producturl, '_blank')}
                                >Get this deal</button>
                            </div>
                            <div className="space-y-3 list-disc mt-4 text-sm text-gray-800">
                                <strong>*</strong> The Discount deal may earn a small commission through affiliate links on this page. Prices quoted are subject to change at any time, and supplies may be limited. Coupon codes or other offers may be modified or removed at any time.
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mt-16 mb-4"></hr>
                <YouMayLike category={pstate.pcategory} />
            </div > </> : <Skeleton />
    )
}

export default PDetails;