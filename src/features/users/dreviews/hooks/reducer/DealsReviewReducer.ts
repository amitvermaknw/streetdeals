import { ADD_REVIWS, GET_REVIWS } from "../../../../../utils/Constants";
import { DealsReview } from "../../../../../utils/Interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DealsReviewReducer = (state: Array<DealsReview>, action: any): Array<DealsReview> => {
    const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_REVIWS:
            return newState.concat(action.content[0]);

        case ADD_REVIWS: {
            const isReviewFound = newState.filter((item: DealsReview) => {
                if (item.uId === action.content[0].uId && item.dealsId === action.content[0].dealsId) {
                    return item;
                }
            })

            if (!isReviewFound.length) {
                return newState.concat(action.content[0]);
            }
            return newState;
        }

        default:
            return newState

    }
}

export default DealsReviewReducer;