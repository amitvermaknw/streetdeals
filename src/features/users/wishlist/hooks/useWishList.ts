import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { updateWishListService } from "../services/withListService";

const useWishList = () => {
    // const localDb = useContext(DbContext);

    const updateWishList = async (dealsReq: DealsReview) => {
        const result: boolean = await updateWishListService(dealsReq);
        if (result) {
            return true;
        }
    }

    return [updateWishList] as const;
};

export default useWishList;

