import { useEffect, useReducer } from "react";
import GetDealsReducer from "./reducer/GetDealsReducer";
import { fetchDealsService } from "../services/fetchDealsService";
import { GET_DEALS } from "../../../../utils/Constants";
import { ProductListProps } from "../../../../utils/Types";

const useGetDeals = (initState: Array<ProductListProps>) => {

    const [state, dispatch] = useReducer(GetDealsReducer, initState)

    const getDeals = async () => {
        const result = await fetchDealsService();
        dispatch({ type: GET_DEALS, content: result })
    }

    useEffect(() => {
        getDeals();
    }, []);
    return [state, getDeals] as const;
};

export default useGetDeals;