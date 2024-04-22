import List from "./List";
import banner from '../../../../data/banner.json';
import GetDealsModel from "../../../../model/GetDealsModel";
import useGetDeals from "../hooks/useGetDeals";
import Skeleton from "../../../../components/ui/Skeleton";


const Dashboard = () => {
    const [state, getDeals] = useGetDeals(GetDealsModel)
    return (<>
        {state?.length ? <List deals={state} getDeals={getDeals} banner={banner} /> : <Skeleton />}
    </>)
}

export default Dashboard