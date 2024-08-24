import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { DealsReview } from "../../../../utils/Interface";
import DealsReviewReducer from "./reducer/DealsReviewReducer";
import { getDealsReview, addDealsReview } from "../services/dealsReviewService";
import { ADD_REVIWS, GET_REVIWS } from "../../../../utils/Constants";
import { DbContext } from "../../../../providers/DBProvider";
// import { dealsReviewSchema } from "../../../../schema/dealsReviewSchema";
import { GetDealsReviewInterface } from "../../../../Interface/DealsReviewInterface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDealsReview = (initState: Array<DealsReview>) => {

    const [prstate, dispatch] = useReducer(DealsReviewReducer, initState);
    const navigate = useNavigate();
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
        if (result) {
            dispatch({ type: GET_REVIWS, content: result, });
        } else {
            navigate('/404');
        }
    }

    const addReview = async (payload: DealsReview) => {
        const result = await addDealsReview(payload, localDb?.db);
        if (result) {
            dispatch({ type: ADD_REVIWS, content: [payload] })
        }
    }


    return [prstate, getReview, addReview] as const;
};

export default useDealsReview;