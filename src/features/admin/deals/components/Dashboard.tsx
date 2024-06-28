import List from "./List";
import GetDealsModel from "../../../../model/GetDealsModel";
import useGetDeals from "../hooks/useGetDeals";
// import Skeleton from "../../../../components/ui/Skeleton";
import useGetBanner from "../hooks/useGetBanner";
import GetBannerModel from "../../../../model/GetBannerModel";
import React from "react";


const Dashboard = () => {
    const [state, getDeals, deleteRecords] = useGetDeals(GetDealsModel);
    const [bstate, getBanner, deleteBannerRecord] = useGetBanner(GetBannerModel)
    return (<>
        <List deals={state} getDeals={getDeals} deleteRecords={deleteRecords}
            banner={bstate}
            getBanner={getBanner}
            deleteBannerRecord={deleteBannerRecord}
        />
    </>)
}

export default Dashboard