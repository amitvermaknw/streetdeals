
import { useState, useRef } from "react";
import DealsReviews from "../../users/dreviews/component/DealsReviews";
import AddDealsReview from "../../users/dreviews/component/AddDealsReview";
import useDealsReview from "../../users/dreviews/hooks/useDealsReview";
import GetDealsReviewModel from "../../../model/DealsReviewModel";
import { DealsReview } from "../../../Interface/DealsReviewInterface";
import { ProductListProps } from "../../../utils/Types";

const PComments = (pstate: ProductListProps) => {

    const [prstate, getReview, addReview, helpfulWidget, deleteComment] = useDealsReview(GetDealsReviewModel);
    const [reviewComment, setReviewComment] = useState(Array<DealsReview>);
    const editRef = useRef<HTMLDivElement | null>(null);

    const editComment = (uId: string) => {
        const comment = prstate.filter((item: DealsReview) => {
            if (item.uId === uId) {
                return item;
            }
        });
        setReviewComment(comment);
        editRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <DealsReviews
                getReview={getReview}
                prstate={prstate}
                dealsId={pstate.pid}
                helpfulWidget={helpfulWidget}
                editComment={editComment}
                deleteComment={deleteComment}
            />
            <div ref={editRef}>
                <AddDealsReview
                    addReview={addReview}
                    pId={pstate.pid}
                    triggerEdit={reviewComment}
                />
            </div>
        </>
    )
}

export default PComments;