/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { GetDealsReviewInterface } from '../../../../Interface/DealsReviewInterface';
import localForage from 'localforage';
import { UserToken } from '../../../../Interface/UserTokenInterface';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_REVIEW_SERVICE_LOCAL : import.meta.env.VITE_REVIEW_SERVICE_PROD;

export const getDealsReview = async (deals: GetDealsReviewInterface): Promise<Array<DealsReview> | Array<[]>> => {
    try {
        // const matchingDocs = await _db.userToken.find().exec();
        const matchingDocs: UserToken | null = await localForage.getItem("loggedInUser");

        const payload = {
            userId: deals.userId,
            dealsId: deals.dealsId,
            page: deals.page,
            state: deals.state
        }
        const result: AxiosResponse<Array<DealsReview>> = await axios.post<Array<DealsReview>>(`${baseUrl}/deals/comments`, payload, { headers: { Authorization: matchingDocs?.accessToken, uid: deals.userId } });
        if (result.status === 200) {
            return result.data;
        } else {
            toast.error(result.statusText);
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
        return [];
    }
}

export const addDealsReview = async (payload: DealsReview): Promise<boolean> => {
    try {
        delete payload.callType;
        const matchingDocs: UserToken | null = await localForage.getItem("loggedInUser");
        const result: AxiosResponse<DealsReview> = await axios.post<DealsReview>(`${baseUrl}/deals/review`, payload, { headers: { Authorization: matchingDocs?.accessToken, uid: matchingDocs?.uId } });
        if (result.status === 200) {
            // await insertDealsReview(_db, payload);
            return true;
        } else {
            toast.error(result.statusText);
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
        return false;
    }
}

export const deleteDealsReview = async (payload: DealsReview): Promise<boolean> => {
    try {
        delete payload.callType;
        // const matchingDocs = await _db.userToken.find().exec();
        const matchingDocs: UserToken | null = await localForage.getItem("loggedInUser");
        const result: AxiosResponse<DealsReview> = await axios.delete<DealsReview>(`${baseUrl}/deals/review/${payload.dealsId}/${payload.uId}`, { headers: { Authorization: matchingDocs?.accessToken, uid: matchingDocs?.uId } });
        if (result.status === 200) {
            return true;
        } else {
            toast.error(result.statusText);
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
        return false;
    }
}