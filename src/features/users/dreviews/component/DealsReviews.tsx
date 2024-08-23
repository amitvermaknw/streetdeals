import { useContext, useEffect } from "react";
import { DealsReview } from "../../../../utils/Interface";
import DealsReviewsList from "./DealsReviewsList";
import { GetDealsReviewInterface } from "../../../../Interface/DealsReviewInterface";
import { DbContext } from "../../../../providers/DBProvider";

interface ReviewRed {
    getReview: (param: GetDealsReviewInterface) => void;
    prstate: Array<DealsReview>
}

const DealsReviews = ({ getReview, prstate }: ReviewRed) => {

    const localDb = useContext(DbContext);

    useEffect(() => {
        async function fetchReview() {
            if (localDb?.db?.collections['dealsReview']) {
                const matchingDocs = await localDb?.db?.dealsReview.find().exec();
                console.log(matchingDocs);
                if (matchingDocs.length > 0) {
                    const firstDoc = matchingDocs[0]
                    getReview({ page: 5, userId: firstDoc?.uId, dealsId: firstDoc?.dealsId });
                }
            }
        }
        fetchReview();

    }, []);

    return (
        <div className="col-span-1 m-auto min-h-full min-w-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-md">
            <h1 className="mb-4 ml-4 text-left font-sans font-bold text-md md:text-md xl:text-xl">Comments</h1>

            <hr className="mt-2 mb-2"></hr>
            {prstate ? prstate.map(item => <DealsReviewsList {...item} />) : ''}
        </div>
    )
}

export default DealsReviews;