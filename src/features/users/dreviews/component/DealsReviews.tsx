import { useEffect } from "react";
import DealsReviewsList from "./DealsReviewsList";
import { GetDealsReviewInterface, DealsReview } from "../../../../Interface/DealsReviewInterface";
import localForage from 'localforage'
import { UserToken } from '../../../../Interface/UserTokenInterface';


interface ReviewRed {
    getReview: (param: GetDealsReviewInterface) => void;
    prstate: Array<DealsReview>,
    dealsId: string,
    helpfulWidget: (payload: DealsReview) => void;
    editComment: (uid: string) => void;
    deleteComment: (payload: DealsReview) => void;
}

const DealsReviews = ({ getReview, prstate, dealsId, helpfulWidget, editComment, deleteComment }: ReviewRed) => {
    // const localDb = useContext(DbContext);

    useEffect(() => {
        async function fetchReview() {
            // if (localDb?.db?.collections['userToken']) {
            //     const matchingDocs = await localDb?.db?.userToken.find().exec();
            //     if (matchingDocs.length > 0) {
            //         const firstDoc = matchingDocs[0];
            //         getReview({ page: 5, userId: firstDoc?.uId, dealsId: dealsId, state: 'start' });
            //     }
            // }
            try {
                const loggedInUser: UserToken | null = await localForage.getItem("loggedInUser");
                if (loggedInUser?.accessToken) {
                    getReview({ page: 5, userId: loggedInUser?.uId, dealsId: dealsId, state: 'start' });
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        }
        fetchReview();
    }, []);

    return (
        prstate.length && prstate[0].comId !== '' ? <div className="col-span-1 m-auto min-h-full min-w-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-xs border border-gray-100">
            <h1 className="m-4 text-left font-sans font-bold text-md md:text-md xl:text-xl">Comments</h1>
            <hr className="mt-2 mb-2"></hr>
            {prstate.length ?
                prstate.map(item => <DealsReviewsList prstate={item} helpful={helpfulWidget} editComment={editComment} deleteComment={deleteComment} key={`${new Date().getMilliseconds()}_${item.comId}`} />)
                : ''
            }
        </div> : ''
    )
}

export default DealsReviews;