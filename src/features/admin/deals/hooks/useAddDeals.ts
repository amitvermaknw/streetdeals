import React, { useCallback, useReducer } from "react";
import AddDealsReducer from "./reducer/AddDealsReducer";
import { AddDeals } from "../../../../utils/Types";
import { FORM_SUMBIT, ON_CHANGE, ON_EDITOR_CHANGE, UPDATE_ELEMENTS_VALUE } from "../../../../utils/Constants";
import { addUpdateDealsService } from "../services/addDealsService";
import { fetchDealsCategories } from "../services/fetchDealsService";

const useAddDeals = (initState: AddDeals) => {

    const [state, dispatch] = useReducer(AddDealsReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChangeEditor = (content: string) => {
        dispatch({ type: ON_EDITOR_CHANGE, payload: { content: content } });
    }

    const getCategory = useCallback(async () => {
        const response = await fetchDealsCategories();
        dispatch({ type: UPDATE_ELEMENTS_VALUE, data: response });
    }, [])

    const onSubmit = useCallback(async () => {
        const response = await addUpdateDealsService(state, 'add');
        dispatch({ type: FORM_SUMBIT, payload: { content: response as boolean } });
    }, []);

    return [state, onChange, onChangeEditor, onSubmit, getCategory] as const
}

export default useAddDeals;