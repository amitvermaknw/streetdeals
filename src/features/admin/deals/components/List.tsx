import { DealsProps } from "../../../../utils/types";
import DealList from "./ListChild/DealList";
import DealListItem from "./ListChild/DealListItems";
import Nav from "./ListChild/Nav";
import NavItem from "./ListChild/NavItem";

type Props = {
    deals: Array<DealsProps>
}

const List = ({ deals }: Props) => {
    return (<>
        <div className="divide-y divide-slate-100">
            <Nav>
                <NavItem href="/new" isActive>New deals</NavItem>
                <NavItem href="/top">All Deals</NavItem>
                {/* <NavItem href="/picks">Vincent’s Picks</NavItem> */}
            </Nav>
            <DealList>
                {deals.map((deal) => (
                    <DealListItem key={deal.id} deals={deal} />
                ))}
            </DealList>
        </div>
    </>)
}

export default List;