import { useEffect } from "react";
import GetDealsModel from "../../../model/GetDealsModel";
import useDealsList from "../hooks/useDealsList";

const DList = () => {

    const [state, dealsList] = useDealsList(GetDealsModel);

    const getDeals = (callType: string) => {
        dealsList(callType);
    }

    useEffect(() => {
        //getDeals('init');
    }, [])


    return (
        <section className="py-4 mb-4">
            <h1 className="mb-4 ml-2 text-left font-sans text-xl font-bold">Deals</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 ml-2 mr-2 mb-4">
                {/* <article className="col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2"> */}
                <article className="w-full">
                    {/* <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"> */}
                    <a className="flex items-center bg-white border border-gray-200 rounded-lg shadow">
                        <div className="flex-shrink-0">
                            <img className="object-cover rounded-t-lg rounded-b-lg w-20 h-28 md:h-auto md:w-56" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>
                        <div className="flex-1 min-w-0 ms-2 p-2">
                            <div className="text-gray-900 font-bold text-sm mb-2">Can coffee make you a better developer?</div>
                            <p className="text-gray-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <p className="text-gray-400 text-sm mt-1"><del>$123</del></p>
                                <p className="text-green-600 text-sm font-bold mt-1">$23</p>
                                <div className="ml-2 rounded-md bg-red-700 py-1 px-4 text-xs text-white md:ml-2 xl:ml-2">Limited time deal</div>
                                <span className="text-sm ml-1 text-gray-400">Deal can be end anytime.</span>
                            </div>

                            <div className="mt-2">
                                <div className="sm:flex sm:justify-between">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <svg className="w-4 h-4 mx-px fill-current text-yellow-300"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                                <path
                                                    d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                                                </path>
                                            </svg>
                                            <svg className="w-4 h-4 mx-px fill-current text-yellow-300"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                                <path
                                                    d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                                                </path>
                                            </svg>
                                            <svg className="w-4 h-4 mx-px fill-current text-yellow-300"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                                <path
                                                    d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                                                </path>
                                            </svg>
                                            <svg className="w-4 h-4 mx-px fill-current text-yellow-300"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                                <path
                                                    d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                                                </path>
                                            </svg>
                                            <svg className="w-4 h-4 mx-px fill-current text-yellow-300"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                                <path
                                                    d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="mt-2">
                                            <button type="button" className=" ml-4 sm:mt-0 px-6 py-1 text-xs font-medium text-center text-whit rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                                Get deal
                                            </button>
                                        </div>

                                        {/* <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                                                16 reviews
                                            </div> */}
                                        {/* <div className="flex flex-wrap gap-4 mt-2">
                                            <p className="text-gray-400 text-xl"><del>$123</del></p>
                                            <p className="text-green-600 text-xl font-bold">$23</p>
                                            <div className="mr-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2">Limited time deal</div>

                                            <span className="text-sm ml-1 text-gray-400">Deal can be end anytime.</span>
                                        </div> */}
                                    </div>

                                </div>
                                {/* <div className="mt-3 text-gray-600 text-sm md:text-sm">
                                    *Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
                                </div> */}
                            </div>
                        </div>
                    </a>
                </article>

            </div>
            <div className="flex items-center p-4">
                <button type="button" className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded hover:bg-blue-300">View More</button>
            </div>
        </section>
    )

}

export default DList;