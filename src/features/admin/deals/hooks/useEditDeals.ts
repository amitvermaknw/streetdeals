import React, { useCallback, useReducer } from "react";
import { fetchDealsCategories, fetchSingleDeal } from "../services/fetchDealsService";
import { FORM_SUMBIT, GET_SINGLE_DEALS, ON_CHANGE, ON_EDITOR_CHANGE, UPDATE_ELEMENTS_VALUE } from "../../../../utils/Constants";
import { AddDeals } from "../../../../utils/Types";
import AddDealsReducer from "./reducer/AddDealsReducer";
import { addUpdateDealsService } from "../services/addDealsService";

const useEditDeals = (initState: AddDeals) => {

    const [state, dispatch] = useReducer(AddDealsReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChangeEditor = (content: string) => {
        dispatch({ type: ON_EDITOR_CHANGE, payload: { content: content } });
    }

    const getSingleDeal = async (pid: string) => {
        await getCategory()
        const result = await fetchSingleDeal(pid);
        dispatch({ type: GET_SINGLE_DEALS, data: result })
    }

    const getCategory = useCallback(async () => {
        const response = await fetchDealsCategories();
        dispatch({ type: UPDATE_ELEMENTS_VALUE, data: response });
    }, [])

    const onUpdateDeals = useCallback(async (payload: AddDeals & { documentId: string }) => {
        const response = await addUpdateDealsService(payload, 'update');
        dispatch({ type: FORM_SUMBIT, payload: { content: response as boolean } });
    }, [])

    return [state, onChange, onChangeEditor, getSingleDeal, onUpdateDeals];
}

export default useEditDeals;