
import { DealsReview } from "../../../../../Interface/DealsReviewInterface";
import { GET_WISH_LIST } from "../../../../../utils/Constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyWishListReducer = (state: Array<DealsReview>, action: { content: Array<DealsReview> | Array<[]>, type: string }): Array<DealsReview> => {
    const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_WISH_LIST:
            return newState.concat(action.content);

        default:
            return newState

    }
}

export default MyWishListReducer;