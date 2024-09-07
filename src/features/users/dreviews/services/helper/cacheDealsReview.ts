/* eslint-disable @typescript-eslint/no-explicit-any */

import { DealsReview } from "../../../../../Interface/DealsReviewInterface";


export const insertDealsReview = async (db: any, data: DealsReview): Promise<boolean> => {
    const matchingDocs = await db.dealsReview
        .find()
        .where('uId')
        .eq(data.uId)
        .where('dealsId')
        .eq(data.dealsId)
        .exec();

    if (matchingDocs.length === 0) {
        await db.dealsReview.insert({ ...data });
        return true;
    }
    return false;
}

export const fetchDealsReview = async (db: any): Promise<Array<DealsReview> | []> => {
    const matchingDocs = await db.dealsReview.find().exec();

    if (matchingDocs.length > 0) {
        return matchingDocs
    }
    return []
}