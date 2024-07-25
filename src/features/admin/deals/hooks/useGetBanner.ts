import { useReducer } from "react";
import GetDealsReducer from "./reducer/GetDealsReducer";
import { GET_DEALS } from "../../../../utils/Constants";
import { BannerListProps } from "../../../../utils/Types";
import { deleteBannerDoc, fetchBannerService } from "../services/fetchBannerService";

const useGetBanner = (initState: Array<BannerListProps>) => {

    const [bstate, dispatch] = useReducer(GetDealsReducer, initState)

    const getBanner = async (callType: string, record: number) => {
        const result = await fetchBannerService(callType, record);
        dispatch({ type: GET_DEALS, content: result })
    }

    const deleteBannerRecord = async (bid: string, imageUrl: string) => {
        await deleteBannerDoc(bid, imageUrl);
        const result = await fetchBannerService('start', 5);
        dispatch({ type: GET_DEALS, content: result })
    }

    return [bstate, getBanner, deleteBannerRecord] as const;
};

export default useGetBanner;