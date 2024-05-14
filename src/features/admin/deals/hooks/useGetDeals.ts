import { useEffect, useReducer } from "react";
import GetDealsReducer from "./reducer/GetDealsReducer";
import { deleteDealsDoc, fetchDealsService } from "../services/fetchDealsService";
import { GET_DEALS } from "../../../../utils/Constants";
import { ProductListProps } from "../../../../utils/Types";

const useGetDeals = (initState: Array<ProductListProps>) => {

    const [state, dispatch] = useReducer(GetDealsReducer, initState)

    const getDeals = async (callType: string) => {
        const result = await fetchDealsService(callType);
        dispatch({ type: GET_DEALS, content: result })
    }

    useEffect(() => {
        getDeals('init');
    }, []);

    const deleteRecords = async (pid: string) => {
        await deleteDealsDoc(pid);
        const result = await fetchDealsService('init');
        dispatch({ type: GET_DEALS, content: result })
    }

    return [state, getDeals, deleteRecords] as const;
};

export default useGetDeals;