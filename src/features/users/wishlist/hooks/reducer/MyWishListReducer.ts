import { MyWishList } from "../../../../../Interface/MyWishListInterface";
import { GET_WISH_LIST } from "../../../../../utils/Constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyWishListReducer = (state: Array<MyWishList | Array<[]>>, action: { content: Array<MyWishList | Array<[]>> | Array<[]>, type: string }): Array<MyWishList | Array<[]>> => {
    const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_WISH_LIST:
            return newState.concat(action.content);

        default:
            return newState

    }
}

export default MyWishListReducer;