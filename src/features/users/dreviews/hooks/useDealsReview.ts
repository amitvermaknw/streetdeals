import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { DealsReview } from "../../../../utils/Interface";
import DealsReviewReducer from "./reducer/DealsReviewReducer";
import { getDealsReview } from "../services/dealsReviewService";
import { GET_REVIWS } from "../../../../utils/Constants";

const useDealsReview = (initState: DealsReview) => {

    const [pstate, dispatch] = useReducer(DealsReviewReducer, initState);
    const navigate = useNavigate();

    const getDealDetails = async (pId: string) => {
        const result = await getDealsReview(pId);

        if (result) {
            dispatch({ type: GET_REVIWS, content: result })
            localStorage.setItem('deals_cache', JSON.stringify(pstate));
        } else {
            navigate('/404');
        }
    }


    return [pstate, getDealDetails] as const;
};

export default useDealsReview;