import { useState } from "react";
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
    banner: Array<BannerListProps>
}

const List = ({ deals, banner }: Props) => {
    const [status, openDialog] = useState(false);
    const [isActiveMenu, setIsActiveMenu] = useState('deals');

    const closeDilog: VoidFun = () => {
        openDialog(false)
    }

    const activeMenu = (nav: string) => {
        setIsActiveMenu(nav);
    }

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

            {isActiveMenu === 'deals' ? <DealList>
                {deals.map((deal) => (
                    <DealListItem key={deal.pid} deals={deal} />
                ))}
            </DealList> :
                <DealList>
                    {banner.map((ban) => (<BannerListItem key={ban.id} banner={ban} />))}
                </DealList>
            }

            {status && isActiveMenu === 'deals' ? <AddDeals onCancel={closeDilog} /> : ''}
            {status && isActiveMenu === 'banner' ? <AddBanner onCancel={closeDilog} /> : ''}


        </div>
    </>)
}

export default List;