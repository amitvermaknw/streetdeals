/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import localForage from 'localforage';
import { UserToken } from '../../../../Interface/UserTokenInterface';
import { MyWishList } from '../../../../Interface/MyWishListInterface';


const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_REVIEW_SERVICE_LOCAL : import.meta.env.VITE_REVIEW_SERVICE_PROD;

export const getMyWishListService = async (callType: string, record: number): Promise<MyWishList | Array<[]>> => {
    try {
        const matchingDocs: UserToken | null = await localForage.getItem("loggedInUser");
        const result: AxiosResponse<MyWishList> = await axios.get<MyWishList>(`${baseUrl}/users/wishlist/${callType}/${record}/${matchingDocs?.uId}`, { headers: { Authorization: matchingDocs?.accessToken, uid: matchingDocs?.uId } });
        if (result.status === 200) {
            return result.data;
        } else {
            toast.error(result.statusText);
            return [];
        }
        return result.data;
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return []
    }
};

export const updateWishListService = async (payload: DealsReview): Promise<boolean> => {
    try {
        delete payload.callType;
        // const matchingDocs = await _db.userToken.find().exec();
        const matchingDocs: UserToken | null = await localForage.getItem("loggedInUser");
        const result: AxiosResponse<DealsReview> = await axios.put<DealsReview>(`${baseUrl}/users/wishlist`, payload, { headers: { Authorization: matchingDocs?.accessToken, uid: matchingDocs?.uId } });
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


