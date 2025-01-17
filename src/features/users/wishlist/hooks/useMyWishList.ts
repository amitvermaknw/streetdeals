import { useReducer } from "react";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { getMyWishListService, updateWishListService } from "../services/wishListService";
import { GET_WISH_LIST } from "../../../../utils/Constants";
// import CommonReducer from "../../../../hooks/reducer/CommonReducer";
import { ProductListProps } from "../../../../utils/Types";
// import { MyWishList } from "../../../../Interface/MyWishListInterface";
import MyWishListReducer from "./reducer/MyWishListReducer";

const useMyWishList = (initState: Array<ProductListProps>) => {
    const [state, dispatch] = useReducer(MyWishListReducer, initState);

    const getMyWishList = async (callType: string, record: number) => {
        const result: ProductListProps | Array<[]> = await getMyWishListService(callType, record);
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

