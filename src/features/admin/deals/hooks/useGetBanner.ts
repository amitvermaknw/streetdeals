import { useReducer } from "react";
import GetDealsReducer from "./reducer/GetDealsReducer";
import { GET_DEALS } from "../../../../utils/Constants";
import { BannerListProps } from "../../../../utils/Types";
import { deleteBannerDoc, fetchBannerService } from "../services/fetchBannerService";

const useGetBanner = (initState: Array<BannerListProps>) => {

    const [bstate, dispatch] = useReducer(GetDealsReducer, initState)

    const getBanner = async () => {
        const result = await fetchBannerService();
        dispatch({ type: GET_DEALS, content: result })
    }

    const deleteBannerRecord = async (pid: string) => {
        await deleteBannerDoc(pid);
        const result = await fetchBannerService();
        dispatch({ type: GET_DEALS, content: result })
    }

    return [bstate, getBanner, deleteBannerRecord] as const;
};

export default useGetBanner;