import { fetchSingleDeal } from "../services/fetchDealsService";
import { GET_SINGLE_DEALS } from "../../../../utils/Constants";
import { useReducer } from "react";
import GetDealsReducer from "./reducer/GetDealsReducer";
import { AddDeals } from "../../../../utils/Types";

const useEditDeals = (initState: AddDeals) => {

    const [state, dispatch] = useReducer(GetDealsReducer, initState)


    const getSingleDeal = async (pid: string) => {
        const result = await fetchSingleDeal(pid);
        dispatch({ type: GET_SINGLE_DEALS, content: result })
    }

    return [state, getSingleDeal];
}

export default useEditDeals;