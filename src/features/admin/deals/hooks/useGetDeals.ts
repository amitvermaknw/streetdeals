import { useEffect, useReducer } from "react";
import GetDealsReducer from "./reducer/GetDealsReducer";
import { deleteDealsDoc, fetchDealsService } from "../services/fetchDealsService";
import { GET_DEALS, GET_DEALS_AFTER_DELETE } from "../../../../utils/Constants";
import { ProductListProps } from "../../../../utils/Types";

const useGetDeals = (initState: Array<ProductListProps>) => {

    const [state, dispatch] = useReducer(GetDealsReducer, initState)

    const getDeals = async (callType: string, record: number) => {
        const result = await fetchDealsService(callType, record);
        dispatch({ type: GET_DEALS, content: result })
    }

    useEffect(() => {
        getDeals('start', 5);
    }, []);

    const deleteRecords = async (pid: string, imageUrl: string) => {
        await deleteDealsDoc(pid, imageUrl);
        const result = await fetchDealsService('start', 1);
        dispatch({ type: GET_DEALS_AFTER_DELETE, content: result })
    }

    return [state, getDeals, deleteRecords] as const;
};

export default useGetDeals;