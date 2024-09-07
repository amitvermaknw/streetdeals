/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { DealsReview } from "../../../../Interface/DealsReviewInterface";

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_REVIEW_SERVICE_LOCAL : import.meta.env.VITE_REVIEW_SERVICE_PROD;

export const updateWishListService = async (payload: DealsReview, _db: any): Promise<boolean> => {
    try {
        delete payload.callType;
        const matchingDocs = await _db.userToken.find().exec();
        const result: AxiosResponse<DealsReview> = await axios.put<DealsReview>(`${baseUrl}/users/wishlist`, payload, { headers: { Authorization: matchingDocs[0]._data.accessToken, uid: matchingDocs[0]._data.uId } });
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
};