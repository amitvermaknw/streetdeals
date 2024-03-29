import { useState } from "react";
import { DealsProps, VoidFun } from "../../../../utils/Types";
import DealList from "./ListChild/DealList";
import DealListItem from "./ListChild/DealListItems";
import Nav from "./ListChild/Nav";
import NavItem from "./ListChild/NavItem";
import AddDeals from "./AddDeals";

type Props = {
    deals: Array<DealsProps>
}

const List = ({ deals }: Props) => {
    const [status, openDialog] = useState(false);
    const closeDilog: VoidFun = () => {
        openDialog(false)
    }

    return (<>
        <div className="divide-y divide-slate-100">
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <Nav>
                        <NavItem href="/new" isActive>New deals</NavItem>
                        <NavItem href="/top">All deals</NavItem>
                        {/* <NavItem href="/picks">Vincent’s Picks</NavItem> */}
                    </Nav>
                </div>
                <div className="py-4  text-sm font-medium flex justify-end">
                    <button type="button" className="py-2 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => openDialog(true)}
                    >Add deals</button>
                </div>
            </div>

            <DealList>
                {deals.map((deal) => (
                    <DealListItem key={deal.id} deals={deal} />
                ))}
            </DealList>

            {status ? <AddDeals onCancel={closeDilog} /> : ''}

        </div>
    </>)
}

export default List;