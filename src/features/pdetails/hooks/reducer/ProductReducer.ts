import { GET_DEALS } from "../../../../utils/Constants";
import { ProductListProps } from "../../../../utils/Types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductReducer = (state: any, action: any): ProductListProps => {
    const new_state = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_DEALS:
            return {
                ...new_state,
                ...action.content[0]
            }
        default:
            return new_state

    }
}

export default ProductReducer;