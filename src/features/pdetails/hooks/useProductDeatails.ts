import { useReducer } from "react";
import { GET_DEALS } from "../../../utils/Constants";
import { ProductListProps } from "../../../utils/Types";
import ProductReducer from "./reducer/ProductReducer";
import { fetchDealDetails } from "../services/fetchDealDetailsService";
import { useNavigate } from "react-router-dom";

const useProductDetails = (initState: ProductListProps) => {

    const [pstate, dispatch] = useReducer(ProductReducer, initState);
    const navigate = useNavigate();

    const getDealDetails = async (pId: string) => {
        const result = await fetchDealDetails(pId);

        if (result.length) {
            dispatch({ type: GET_DEALS, content: result })
            localStorage.setItem('deals_cache', JSON.stringify(pstate));
        } else {
            navigate('/404');
        }
    }


    return [pstate, getDealDetails] as const;
};

export default useProductDetails;