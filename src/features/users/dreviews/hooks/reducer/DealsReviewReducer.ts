import { GET_REVIWS } from "../../../../../utils/Constants";
import { DealsReview } from "../../../../../utils/Interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DealsReviewReducer = (state: DealsReview, action: any): DealsReview => {
    const new_state = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_REVIWS:
            return new_state.concat(action.content[0]);
        default:
            return new_state

    }
}

export default DealsReviewReducer;