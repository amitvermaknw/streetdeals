import { useReducer } from "react";
import { GET_DEALS } from "../../../utils/Constants";
import { BannerListProps } from "../../../utils/Types";
import { fetchBannerService } from "../services/fetchBDServices";
import CommonReducer from '../../../hooks/reducer/CommonReducer';

const useGetBanner = (initState: Array<BannerListProps>) => {

    const [bstate, dispatch] = useReducer(CommonReducer, initState)

    const fetchBanner = async () => {
        const result = await fetchBannerService();
        dispatch({ type: GET_DEALS, content: result || '' })
    }


    return [bstate, fetchBanner] as const;
};

export default useGetBanner;