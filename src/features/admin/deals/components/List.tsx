import { useEffect, useState } from "react";
import { BannerListProps, ProductListProps, VoidFun } from "../../../../utils/Types";
import DealList from "./ListChild/DealList";
import DealListItem from "./ListChild/DealListItems";
import Nav from "./ListChild/Nav";
import NavItem from "./ListChild/NavItem";
import AddDeals from "./AddDeals";
import BannerListItem from "./ListChild/BannerListItems";
import AddBanner from "./AddBanner";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deals: Array<ProductListProps>,
    banner: Array<BannerListProps>,
    getDeals: (callType: string, record: number) => Promise<void>,
    deleteRecords: (pid: string, imageUrl: string) => void,
    getBanner: (callType: string, record: number) => void,
    deleteBannerRecord: (pid: string, imageUrl: string) => void
}

const List = ({ deals, getDeals, deleteRecords, banner, getBanner, deleteBannerRecord }: Props) => {
    const [status, openDialog] = useState(false);
    const [isActiveMenu, setIsActiveMenu] = useState('deals');
    const [loader, setLoader] = useState(false);

    const closeDilog: VoidFun = () => {
        openDialog(false)
    }

    const activeMenu = (nav: string) => {
        setIsActiveMenu(nav);
    }

    const onNextDeals = async () => {
        setLoader(true);
        await getDeals('next', 5);
        setLoader(false);
    };

    const onNextBanner = async () => {
        setLoader(true);
        await getBanner('next', 5);
        setLoader(false);
    };

    useEffect(() => {
        if (isActiveMenu === 'banner') {
            getBanner('start', 5);
        }
    }, [isActiveMenu]);

    return (<>
        <div className="divide-y divide-slate-100">
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <Nav>
                        <NavItem href="#" onClick={() => activeMenu('deals')} isActive={isActiveMenu === 'deals' ? true : false}>New deals</NavItem>
                        <NavItem href="#" onClick={() => activeMenu('banner')} isActive={isActiveMenu === 'banner' ? true : false}>Deals Banner</NavItem>
                        {/* <NavItem href="/picks">Vincent’s Picks</NavItem> */}
                    </Nav>
                </div>
                <div className="py-4  text-sm font-medium flex justify-end">
                    <button type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => openDialog(true)}
                    >{isActiveMenu === 'deals' ? 'Add deals' : 'Add Banners'}</button>
                </div>
            </div>

            {isActiveMenu === 'deals' ?
                <>
                    {deals.length ? <DealList>
                        {deals.map((deal) => (
                            <DealListItem key={`${Math.random()}_${deal.pid}`} deals={deal} deleteRecords={deleteRecords} />
                        ))}
                    </DealList> : <p className="p-5">No Record found...</p>}
                    <div className="py-4  text-sm font-medium flex justify-end">
                        <button type="button"
                            onClick={() => onNextDeals()}
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {loader ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>Loading...</> : 'Load more...'}

                        </button>
                    </div>
                </>
                :
                <>
                    <DealList>
                        {banner.map((ban) => (<BannerListItem key={`${Math.random()}_${ban.bid}`} banner={ban} deleteBannerRecord={deleteBannerRecord} />))}
                    </DealList>
                    <div className="py-4  text-sm font-medium flex justify-end">
                        <button type="button"
                            onClick={() => onNextBanner()}
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {loader ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>Loading...</> : 'Load more...'}

                        </button>
                    </div>
                </>
            }

            {status && isActiveMenu === 'deals' ? <AddDeals onCancel={closeDilog} /> : ''}
            {status && isActiveMenu === 'banner' ? <AddBanner onCancel={closeDilog} /> : ''}


        </div>
    </>)
}

export default List;