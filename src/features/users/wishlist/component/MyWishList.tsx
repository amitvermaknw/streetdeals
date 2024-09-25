import { useEffect } from "react";
import Skeleton from "../../../../components/ui/Skeleton";
import { ProductListProps } from "../../../../utils/Types";
import Review from "../../../../components/ui/Review";
import usePageSeo from "../../../../hooks/usePageSeo";
import { useLocation } from "react-router-dom";
import useMyWishList from "../hooks/useMyWishList";
import MyWishListModel from "../../../../model/MyWishListModel";

const MyWishList = () => {

    const [state, getMyWishList] = useMyWishList(MyWishListModel);
    const mode = import.meta.env;
    const baseUrl = mode.DEV === true ? import.meta.env.VITE_BASE_LOCAL_URL : import.meta.env.VITE_BASE_PROD_URL;

    const getDeals = (callType: string, record: number) => {
        getMyWishList(callType, record);
    }

    useEffect(() => {
        getDeals('start', 20);
    }, [])

    usePageSeo({
        title: 'My Wish List',
        description: 'Your go-to site for the best deals and discounts. From exclusive promotions to daily sales, find the perfect offer for you. Save money with our latest coupon codes and special offers.',
        keywords: ["deals, promotions, discounts, coupons, sales, offers, bargains, shopping deals, online deals, daily deals, best deals, special offers, discount codes, promo codes, savings, hot deals, limited time offers, exclusive deals, cheap prices, top deals, budget shopping, clearance sales"],
        ogTitle: 'Best Deals and Promotions - My Wish List',
        ogDescription: 'Your go-to site for the best deals and discounts. From exclusive promotions to daily sales, find the perfect offer for you. Save money with our latest coupon codes and special offers.',
        ogImage: 'https://res.cloudinary.com/dxhnwasub/image/upload/v1718418448/banner_images/cf0bqcwicru4xh0wjk74.jpg',
        ogUrl: `${baseUrl}${useLocation().pathname}`
    })

    return (state.length ? <section className="py-4 mb-4">
        <h1 className="mb-4 ml-2 text-left font-sans  font-bold text-sm md:text-md xl:text-xl">Deals</h1>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 ml-2 mr-2">
            {state.map((item: ProductListProps, index: number) => {
                return <article className="w-full h-full" key={`${item.pid}_${index}`}>
                    <a href={`/pdetails/${item.urlstring ? item.urlstring : item.pid}`} className="flex items-center bg-white border border-gray-200 rounded-lg shadow h-full">
                        <div className="flex-shrink-0 ml-1">
                            <img className="object-cover rounded-t-lg rounded-b-lg w-20 h-22 md:h-auto md:w-56" src={item.pimageurl} alt="" />
                        </div>
                        <div className="flex-1 min-w-0 ms-2 p-2">
                            <div className="text-gray-900 text-sm mb-2">{item.pshortdetails}</div>
                            {/* <p className="text-gray-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p> */}
                            <div className="flex flex-wrap gap-3 mt-2">
                                {item.preprice ? <p className="text-gray-400 text-sm"><del>${item.preprice}</del></p> : ''}
                                <p className="text-green-600 text-sm font-bold">${item.price}</p>
                                {/* <div className="sm:flex sm:justify-between"> */}
                                {/* <div className="flex items-right"> */}
                                {item.preview ? <Review props={item.preview} /> : ''}
                                {/* <div className="mt-2">
                                            <button type="button" className=" ml-4 sm:mt-0 px-6 py-1 text-xs font-medium text-center text-whit rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                                Get this deal
                                            </button>
                                        </div> */}

                                {/* <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                                                16 reviews
                                            </div> */}
                                {/* <div className="flex flex-wrap gap-4 mt-2">
                                            <p className="text-gray-400 text-xl"><del>$123</del></p>
                                            <p className="text-green-600 text-xl font-bold">$23</p>
                                            <div className="mr-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2">Limited time deal</div>

                                            <span className="text-sm ml-1 text-gray-400">Deal can be end anytime.</span>
                                        </div> */}
                                {/* </div> */}

                                {/* </div> */}

                            </div>

                            <div className="flex flex-wrap mt-2">
                                {item.ptimeframe ? <div className="mr-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2">{item.ptimeframe}</div> : ''}
                                <button type="button"
                                    onClick={() => window.open(item.producturl, '_blank')}
                                    className="sm:mt-0 px-4 py-0.5 text-xs font-medium text-center text-whit rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 me-2  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                    Get this deal
                                </button>
                                <span className="text-xs ml-1 text-gray-400 mt-1"><strong>*</strong> Deal can be end anytime.</span>
                            </div>
                        </div>
                    </a>
                </article>
            })}
        </div>
        <div className="flex items-center p-4">
            <button
                onClick={() => getDeals('next', 20)}
                type="button"
                className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded hover:bg-blue-300">View More</button>
        </div>
    </section > : <Skeleton />)
}

export default MyWishList;