import { ADD_HELPFUL_REVIWS, ADD_REVIWS, GET_REVIWS, REMOVE_REVIWS } from "../../../../../utils/Constants";
import { DealsReview } from "../../../../../Interface/DealsReviewInterface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DealsReviewReducer = (state: Array<DealsReview>, action: { content: Array<DealsReview> | Array<[]>, type: string }): Array<DealsReview> => {
    const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_REVIWS:
            return newState.concat(action.content);

        case ADD_REVIWS: {
            if (action.content.length > 0 && 'callType' in action.content[0]) {
                if (action.content[0].callType === 'add') {
                    const isReviewFound = newState.filter((item: DealsReview) => {
                        if (action.content.length > 0 && 'uId' in action.content[0]) {
                            if (item.uId === action.content[0].uId && item.dealsId === action.content[0].dealsId) {
                                return item;
                            }
                        }
                    });

                    if (!isReviewFound.length) {
                        return newState.concat(action.content[0]);
                    }

                } else if (action.content[0].callType === 'update') {
                    newState.filter((item: DealsReview) => {
                        if (action.content.length > 0 && 'uId' in action.content[0]) {
                            if (item.uId === action.content[0].uId && item.dealsId === action.content[0].dealsId) {
                                item.comments = action.content[0].comments;
                                return item;
                            }
                        }
                    });
                }
            }
            return newState;
        }

        case ADD_HELPFUL_REVIWS: {
            newState.filter((item: DealsReview) => {
                if (action.content.length > 0 && 'uId' in action.content[0]) {
                    if (item.uId === action.content[0].uId && item.dealsId === action.content[0].dealsId) {
                        item.helpful = action.content[0].helpful;
                        item.totalHelpful = action.content[0].totalHelpful;
                        return item;
                    }
                }
            });
            return newState;
        }

        case REMOVE_REVIWS: {
            const filteredState = newState.filter((item: DealsReview) => {
                if (action.content.length > 0 && 'uId' in action.content[0]) {
                    return !(item.uId === action.content[0].uId && item.dealsId === action.content[0].dealsId)
                }
                return true;
            });
            return filteredState;
        }

        default:
            return newState

    }
}

export default DealsReviewReducer;