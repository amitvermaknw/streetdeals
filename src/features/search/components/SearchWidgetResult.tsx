import { Highlight } from "react-instantsearch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchWidgetResult = ({ hit }: any) => {

    return (<>
        <article className="w-full h-full">
            <a href={`/pdetails/${hit.pid}`} className="flex items-center ">
                <div className="flex-shrink-0 ml-1">
                    <img className="object-cover p-2 rounded-t-lg rounded-b-lg w-20 h-22 md:h-auto md:w-32" src={hit.pimageurl} alt="" />
                </div>
                <div className="flex-1 min-w-0 ms-2 p-2">
                    <div className="text-gray-900 text-sm mb-2"><Highlight attribute="pshortdetails" hit={hit} /></div>
                    <div className="flex flex-wrap gap-3 mt-2">
                        <p className="text-gray-400 text-sm"><del>$<Highlight attribute="preprice" hit={hit} /></del></p>
                        <p className="text-green-600 text-sm font-bold">$<Highlight attribute="price" hit={hit} /></p>
                        <div className="">
                            <button type="button" className=" ml-4 sm:mt-0 px-6 py-1 text-xs font-medium text-center text-whit rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                Get this deal
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    </>
    );
};