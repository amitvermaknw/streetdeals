import { useContext, useReducer } from "react";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import DealsReviewReducer from "./reducer/DealsReviewReducer";
import { getDealsReview, addDealsReview, deleteDealsReview } from "../services/dealsReviewService";
import { ADD_HELPFUL_REVIWS, ADD_REVIWS, GET_REVIWS, REMOVE_REVIWS } from "../../../../utils/Constants";
import { DbContext } from "../../../../providers/DBProvider";
import { GetDealsReviewInterface } from "../../../../Interface/DealsReviewInterface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDealsReview = (initState: Array<DealsReview>) => {

    const [prstate, dispatch] = useReducer(DealsReviewReducer, initState);
    const localDb = useContext(DbContext);

    const getReview = async (dealsReq: GetDealsReviewInterface) => {
        const result: Array<DealsReview> | Array<[]> = await getDealsReview(dealsReq, localDb?.db);
        if (result.length) {
            dispatch({ type: GET_REVIWS, content: result, });
        }
    }

    const addReview = async (payload: DealsReview) => {
        const newPayload: DealsReview = { ...payload };
        const result = await addDealsReview(payload, localDb?.db);
        if (result) {
            dispatch({ type: ADD_REVIWS, content: [newPayload] })
        }
    }

    const helpfulWidget = async (payload: DealsReview) => {
        const result = await addDealsReview(payload, localDb?.db);
        if (result) {
            dispatch({ type: ADD_HELPFUL_REVIWS, content: [payload] })
        }
    }

    const deleteComment = async (payload: DealsReview) => {
        const result = await deleteDealsReview(payload, localDb?.db);
        if (result) {
            dispatch({ type: REMOVE_REVIWS, content: [payload] })
        }
    }

    return [prstate, getReview, addReview, helpfulWidget, deleteComment] as const;
};

export default useDealsReview;