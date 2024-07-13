import { useReducer } from "react";
import { GET_DEALS } from "../../../utils/Constants";
import { ProductListProps } from "../../../utils/Types";
import { fetchDealsService } from "../services/fetchBDServices";
import CommonReducer from '../../../hooks/reducer/CommonReducer';

const useGetDeals = (initState: Array<ProductListProps>) => {

    const [pstate, dispatch] = useReducer(CommonReducer, initState)

    const fetchDeals = async (callType: string, record: number) => {
        const result = await fetchDealsService(callType, record);
        dispatch({ type: GET_DEALS, content: result })
        localStorage.setItem('deals_cache', JSON.stringify(pstate));
    }


    return [pstate, fetchDeals] as const;
};

export default useGetDeals;