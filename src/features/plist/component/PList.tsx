const PList = () => {
    return (
        <section className="py-4 mb-4">
            <h1 className="mb-4 ml-2 text-left font-sans text-xl font-bold">Deals</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-2 mr-2 mb-4">
                <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                    <a href="/pdetails" className="block h-full w-full">
                        <img className="max-h-40 w-full object-cover" alt="featured image" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                        <div className="w-full bg-white p-2">
                            {/* <p className="text-md font-medium text-indigo-500">Nature</p> */}
                            <p className="mb-3 text-lg font-medium text-gray-800 line-clamp-2">
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                            </p>
                            <p className="text-md font-light text-gray-400 line-clamp-4 sm:text-sm">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                            </p>

                            <div className="justify-starts mt-4 flex flex-wrap items-center">
                                <div className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">$599</div>
                                {/* <div className="mr-2 mt-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white">Limited time</div> */}
                                <span className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">Coupon: Default</span>
                            </div>
                        </div>
                    </a>
                </article>

                <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                    <a href="#" className="block h-full w-full">
                        <img className="max-h-40 w-full object-cover" alt="featured image" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                        <div className="w-full bg-white p-2">
                            {/* <p className="text-md font-medium text-indigo-500">Nature</p> */}
                            <p className="mb-3 text-lg font-sans font-medium text-gray-800 line-clamp-2">
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                            </p>
                            <p className="text-md font-light text-gray-400 line-clamp-4 sm:text-sm">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                            </p>

                            <div className="justify-starts mt-4 flex flex-wrap items-center">
                                <div className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">$599</div>
                                {/* <div className="mr-2 mt-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white">Limited time</div> */}
                                <span className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">Coupon: Default</span>
                            </div>
                        </div>
                    </a>
                </article>

                <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                    <a href="#" className="block h-full w-full">
                        <img className="max-h-40 w-full object-cover" alt="featured image" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                        <div className="w-full bg-white p-2">
                            {/* <p className="text-md font-medium text-indigo-500">Nature</p> */}
                            <p className="mb-3 text-lg font-sans font-medium text-gray-800 line-clamp-2">
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                            </p>
                            <p className="text-md font-light text-gray-400 line-clamp-4 sm:text-sm">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                            </p>

                            <div className="justify-starts mt-4 flex flex-wrap items-center">
                                <div className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">$599</div>
                                {/* <div className="mr-2 mt-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white">Limited time</div> */}
                                <span className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">Coupon: Default</span>
                            </div>
                        </div>
                    </a>
                </article>

                <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                    <a href="#" className="block h-full w-full">
                        <img className="max-h-40 w-full object-cover" alt="featured image" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                        <div className="w-full bg-white p-2">
                            {/* <p className="text-md font-medium text-indigo-500">Nature</p> */}
                            <p className="mb-3 text-lg font-sans font-medium text-gray-800 line-clamp-2">
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                                A Visit to Mount Abignale
                            </p>
                            <p className="text-md font-light text-gray-400 line-clamp-4 sm:text-sm">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?
                            </p>

                            <div className="justify-starts mt-4 flex flex-wrap items-center">
                                <div className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">$599</div>
                                {/* <div className="mr-2 mt-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white">Limited time</div> */}
                                <span className="mr-2 mt-2 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">Coupon: Default</span>
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

export default PList;