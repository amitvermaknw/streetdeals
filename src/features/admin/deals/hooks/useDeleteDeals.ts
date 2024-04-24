import React, { useCallback, useReducer } from "react";
import { fetchSingleDeal } from "../services/fetchDealsService";
import { FORM_SUMBIT, GET_SINGLE_DEALS, ON_CHANGE, ON_EDITOR_CHANGE } from "../../../../utils/Constants";
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
        const result = await fetchSingleDeal(pid);
        dispatch({ type: GET_SINGLE_DEALS, data: result })
    }

    const onUpdateDeals = useCallback(async () => {
        const response = await addUpdateDealsService(state, 'update');
        dispatch({ type: FORM_SUMBIT, payload: { content: response as boolean } });
    }, [])

    return [state, onChange, onChangeEditor, getSingleDeal, onUpdateDeals];
}

export default useEditDeals;