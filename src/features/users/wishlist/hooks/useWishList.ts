import { useContext } from "react";
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { DbContext } from "../../../../providers/DBProvider";
import { updateWishListService } from "../services/withListService";

const useWishList = () => {
    const localDb = useContext(DbContext);

    const updateWishList = async (dealsReq: DealsReview) => {
        const result: boolean = await updateWishListService(dealsReq, localDb?.db);
        if (result) {
            return true;
        }
    }

    return [updateWishList] as const;
};

export default useWishList;

