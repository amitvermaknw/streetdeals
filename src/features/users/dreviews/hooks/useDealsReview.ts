import { useContext, useReducer } from "react";
// import { useNavigate } from "react-router-dom";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import DealsReviewReducer from "./reducer/DealsReviewReducer";
import { getDealsReview, addDealsReview } from "../services/dealsReviewService";
import { ADD_REVIWS, GET_REVIWS } from "../../../../utils/Constants";
import { DbContext } from "../../../../providers/DBProvider";
// import { dealsReviewSchema } from "../../../../schema/dealsReviewSchema";
import { GetDealsReviewInterface } from "../../../../Interface/DealsReviewInterface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDealsReview = (initState: Array<DealsReview>) => {

    const [prstate, dispatch] = useReducer(DealsReviewReducer, initState);
    const localDb = useContext(DbContext);

    // useEffect(() => {
    //     async function setSchema() {
    //         if (localDb?.db) {
    //             if (localDb?.db?.collections['dealsReview'] && localDb?.db?.dealsReview.getVersion()) return

    //             await localDb?.db.addCollections({
    //                 dealsReview: {
    //                     schema: dealsReviewSchema
    //                 }
    //             })
    //         }
    //     }

    //     setSchema();
    // }, [localDb?.db])

    const getReview = async (dealsReq: GetDealsReviewInterface) => {
        const result = await getDealsReview(dealsReq, localDb?.db);
        if (result.length) {
            dispatch({ type: GET_REVIWS, content: result, });
        }
    }

    const addReview = async (payload: DealsReview) => {
        const result = await addDealsReview(payload, localDb?.db);
        if (result) {
            dispatch({ type: ADD_REVIWS, content: [payload] })
        }
    }

    const helpfulWidget = async (payload: DealsReview) => {
        if (payload.callType === 'add') {
            delete payload.callType;
            const result = await addDealsReview(payload, localDb?.db);
            if (result) {
                dispatch({ type: ADD_REVIWS, content: [payload] })
            }
        } else if (payload.callType === 'update') {
            delete payload.callType;
            const result = await addDealsReview(payload, localDb?.db);
            if (result) {
                dispatch({ type: ADD_REVIWS, content: [payload] })
            }
        }
    }

    return [prstate, getReview, addReview, helpfulWidget] as const;
};

export default useDealsReview;