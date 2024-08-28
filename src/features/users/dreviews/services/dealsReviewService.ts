/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { DealsReview } from "../../../../Interface/DealsReviewInterface";
import { GetDealsReviewInterface } from '../../../../Interface/DealsReviewInterface';

const mode = import.meta.env;
const baseUrl = mode.DEV === true ? import.meta.env.VITE_REVIEW_SERVICE_LOCAL : import.meta.env.VITE_REVIEW_SERVICE_PROD;

export const getDealsReview = async (deals: GetDealsReviewInterface, _db: any): Promise<Array<DealsReview> | Array<[]>> => {
    try {
        const matchingDocs = await _db.userToken.find().exec();
        const payload = {
            userId: deals.userId,
            dealsId: deals.dealsId,
            page: deals.page,
            state: deals.state
        }
        const result: AxiosResponse<Array<DealsReview>> = await axios.post<Array<DealsReview>>(`${baseUrl}/deals/comments`, payload, { headers: { Authorization: matchingDocs[0]._data.accessToken } });
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

export const addDealsReview = async (payload: DealsReview, _db: any): Promise<boolean> => {
    try {
        const matchingDocs = await _db.userToken.find().exec();
        const result: AxiosResponse<DealsReview> = await axios.post<DealsReview>(`${baseUrl}/deals/review`, payload, { headers: { Authorization: matchingDocs[0]._data.accessToken } });
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

export const updateDealsReview = async (payload: DealsReview, _db: any): Promise<boolean> => {
    try {
        const matchingDocs = await _db.userToken.find().exec();
        const result: AxiosResponse<DealsReview> = await axios.post<DealsReview>(`${baseUrl}/deals/review/update`, payload, { headers: { Authorization: matchingDocs[0]._data.accessToken } });
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