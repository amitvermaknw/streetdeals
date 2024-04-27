import { useReducer } from "react";
import { GET_DEALS } from "../../../utils/Constants";
import CommonReducer from "./reducer/CommonReducer";
import { ProductListProps } from "../../../utils/Types";
import { fetchDealsService } from "../services/fetchBDServices";

const useGetDeals = (initState: Array<ProductListProps>) => {

    const [pstate, dispatch] = useReducer(CommonReducer, initState)

    const fetchDeals = async () => {
        const result = await fetchDealsService();
        //const arg: { type: string, content: Array<ProductListProps | string> | undefined } = { type: GET_DEALS, content: result }
        dispatch({ type: GET_DEALS, content: result })
    }


    return [pstate, fetchDeals] as const;
};

export default useGetDeals;