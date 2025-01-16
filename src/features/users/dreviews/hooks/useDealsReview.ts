import { useEffect, useReducer } from "react";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import DealsReviewReducer from "./reducer/DealsReviewReducer";
import { getDealsReview, addDealsReview, deleteDealsReview } from "../services/dealsReviewService";
import { ADD_HELPFUL_REVIWS, ADD_REVIWS, GET_REVIWS, REMOVE_REVIWS } from "../../../../utils/Constants";
import { GetDealsReviewInterface } from "../../../../Interface/DealsReviewInterface";
import { BehaviorSubject } from "rxjs";

const dealsCommentDetails = new BehaviorSubject<DealsReview>({
    comId: '',
    uId: '',
    userName: '',
    startDate: new Date(),
    comments: '',
    dealsId: '',
    helpful: false,
    joinedOn: '',
    photoUrl: '',
    totalHelpful: 0,
    callType: '',
    wishListDealId: ''
});

const useDealsReview = (initState: Array<DealsReview>) => {

    const [prstate, dispatch] = useReducer(DealsReviewReducer, initState);
    // const localDb = useContext(DbContext);

    useEffect(() => {
        function checkState() {
            dealsCommentDetails.next(prstate[0]);
        }
        checkState();
    }, [prstate])

    const getReview = async (dealsReq: GetDealsReviewInterface) => {
        const result: Array<DealsReview> | Array<[]> = await getDealsReview(dealsReq);
        if (result.length) {
            dispatch({ type: GET_REVIWS, content: result, });
        }
        dealsCommentDetails.next(prstate[0]);
    }

    const addReview = async (payload: DealsReview) => {
        const newPayload: DealsReview = { ...payload };
        const result = await addDealsReview(payload);
        if (result) {
            dispatch({ type: ADD_REVIWS, content: [newPayload] })
        }
    }

    const helpfulWidget = async (payload: DealsReview) => {
        const result = await addDealsReview(payload);
        if (result) {
            dispatch({ type: ADD_HELPFUL_REVIWS, content: [payload] })
        }
    }

    const deleteComment = async (payload: DealsReview) => {
        const result = await deleteDealsReview(payload);
        if (result) {
            dispatch({ type: REMOVE_REVIWS, content: [payload] })
        }
    }

    return [prstate, getReview, addReview, helpfulWidget, deleteComment] as const;
};

export default useDealsReview;

export const dealsCommentDetails$ = dealsCommentDetails.asObservable();