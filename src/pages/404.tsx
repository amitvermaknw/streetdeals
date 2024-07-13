import { useNavigate } from "react-router-dom";

const PageNotfound = () => {
    const navigator = useNavigate();
    return (
        <>
            <section className="py-2">
                <div className="mx-auto grid max-w-screen-2xl  ml-2 mr-2">
                    <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                        <span className="font-medium">Info alert!</span> Page not found.
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                        <div></div>
                        <button
                            type="button"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => navigator("/")}
                        >Go to Home page</button>
                        <div></div>
                    </div>

                </div>
            </section>
        </>
    )
};

export default PageNotfound;