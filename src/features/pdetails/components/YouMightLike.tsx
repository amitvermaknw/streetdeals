import { useEffect } from "react";
import Skeleton from "../../../components/ui/Skeleton";
import GetDealsModel from "../../../model/GetDealsModel";
import useYouMightLike from "../hooks/useYouMightLike";
import { ProductListProps } from "../../../utils/Types";
import { useNavigate } from "react-router-dom";
import React from "react";

const YouMightLike = () => {

    const [pstate, getYouMightLike] = useYouMightLike(GetDealsModel);
    const navigate = useNavigate();

    const getDeals = (callType: string) => {
        getYouMightLike(callType);
    }

    useEffect(() => {
        getDeals('Electronics');
    }, [])


    return (
        pstate.length ? <section className="py-2">
            <h1 className="mb-4 ml-2 text-left font-sans  font-bold text-sm md:text-md xl:text-xl">You might like deals</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-2 mr-2">
                {pstate.length ? pstate.map((item: ProductListProps, index: number) => {
                    return <article key={`${item.pid}_${index}`} className="h-90 col-span-1 m-auto min-h-full min-w-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                        <a href={`/pdetails/${item.pid}`} className="block h-full w-full">
                            <img className="max-h-40 w-full object-cover" alt="featured image" src={item.pimageurl} />
                            <div className="w-full bg-white p-2">
                                {/* <p className="text-md font-medium text-indigo-500">Nature</p> */}
                                <p className="mb-3 text-sm md:text-md xl:text-xl font-medium text-gray-800 line-clamp-2">
                                    {item.pname}
                                </p>
                                {/* <p className="text-sm md:text-md xl:text-xl font-light text-gray-400 line-clamp-4 sm:text-sm">
                                    {item.pshortdetails}
                                </p> */}

                                <div className="justify-starts mt-4 flex flex-wrap items-center">
                                    <p className="text-gray-400 text-md"><del>${item.preprice}</del></p>
                                    <p className="text-green-600 text-md ml-2">${item.price}</p>
                                    {item.coupon ? <p className="mb-3 text-sm md:text-md xl:text-xl xl:ml-2 font-medium text-gray-400 line-clamp-2 mt-2">
                                        With coupon code.
                                    </p> : ''}
                                    {/* <div className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">{item.price}</div> */}
                                    {item.ptimeframe ? <div className="mr-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2">{item.ptimeframe}</div> : ''}
                                    {/* <span className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">Coupon: Default</span> */}
                                </div>
                            </div>
                        </a>
                    </article>
                }) : ''}

            </div>
            <div className="flex p-2 pt-8 justify-center">
                <button
                    onClick={() => navigate("/deals")}
                    type="button"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">View more</button>
            </div>
        </section> : <Skeleton />
    )
}

export default YouMightLike;