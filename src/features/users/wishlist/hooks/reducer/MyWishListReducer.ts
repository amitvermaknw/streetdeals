// import { MyWishList } from "../../../../../Interface/MyWishListInterface";
import { GET_WISH_LIST } from "../../../../../utils/Constants";
import { ProductListProps } from "../../../../../utils/Types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyWishListReducer = (state: Array<ProductListProps | Array<[]>>, action: { content: ProductListProps | Array<[]>, type: string }): Array<ProductListProps> => {
    const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_WISH_LIST:
            return newState.concat(action.content);

        default:
            return newState

    }
}

export default MyWishListReducer;