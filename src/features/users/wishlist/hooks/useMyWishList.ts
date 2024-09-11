import { useReducer } from "react";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { updateWishListService } from "../services/wishListService";
import { GET_WISH_LIST } from "../../../../utils/Constants";
import CommonReducer from "../../../../hooks/reducer/CommonReducer";
import { ProductListProps } from "../../../../utils/Types";

const useMyWishList = (initState: Array<ProductListProps>) => {
    const [state, dispatch] = useReducer(CommonReducer, initState);

    const getMyWishList = async (dealsReq: DealsReview) => {
        const result: boolean = await updateWishListService(dealsReq);
        if (result) {
            dispatch({ type: GET_WISH_LIST, content: result });
        }
    }

    const updateWishList = async (dealsReq: DealsReview) => {
        const result: boolean = await updateWishListService(dealsReq);
        if (result) {
            return true;
        }
    }

    return [state, getMyWishList, updateWishList] as const;
};

export default useMyWishList;

