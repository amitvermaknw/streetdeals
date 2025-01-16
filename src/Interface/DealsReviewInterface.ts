export interface GetDealsReviewInterface {
    page: number, userId: string, dealsId: string, state: string
}

export interface DealsReview {
    comId: string,
    uId: string,
    userName?: string,
    startDate?: Date,
    comments: string,
    dealsId: string,
    helpful?: boolean,
    joinedOn?: string,
    photoUrl?: string,
    totalHelpful?: number,
    callType?: string,
    wishListDealId?: string
}