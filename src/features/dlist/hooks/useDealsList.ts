import { useReducer } from "react";
import { ProductListProps } from "../../../utils/Types";
import { dealsListService } from "../services/dealListServices";
import { GET_DEALS } from "../../../utils/Constants";
import CommonReducer from "../../../hooks/reducer/CommonReducer";


const useDealsList = (initState: Array<ProductListProps>) => {

    const [state, dispatch] = useReducer(CommonReducer, initState)

    const dealsList = async (callType: string, record: number) => {
        const result = await dealsListService(callType, record);
        dispatch({ type: GET_DEALS, content: result })
    }

    return [state, dealsList] as const;
};

export default useDealsList;