import { useReducer } from "react";
import { ProductListProps } from "../../../utils/Types";

import { dealsListService } from "../services/dealListServices";
import { GET_DEALS } from "../../../utils/Constants";
import DealsListReducer from './reducer/DealsListReducer';


const useDealsList = (initState: Array<ProductListProps>) => {

    const [state, dispatch] = useReducer(DealsListReducer, initState)

    const dealsList = async (callType: string) => {
        const result = await dealsListService(callType);
        dispatch({ type: GET_DEALS, content: result })
    }

    // useEffect(() => {
    //     dealsList();
    // }, []);


    return [state, dealsList] as const;
};

export default useDealsList;