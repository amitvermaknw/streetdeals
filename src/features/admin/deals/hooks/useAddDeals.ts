import React, { useCallback, useReducer } from "react";
import AddDealsReducer from "./reducer/AddDealsReducer";
import { AddDeals } from "../../../../utils/Types";
import { FORM_SUMBIT, ON_CHANGE, ON_EDITOR_CHANGE } from "../../../../utils/Constants";
import { addDealsService } from "../services/addDealsService";

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

    const onSubmit = useCallback(async () => {
        const response = await addDealsService(state);
        dispatch({ type: FORM_SUMBIT, payload: { content: response as boolean } })
    }, []);

    return [state, onChange, onChangeEditor, onSubmit] as const
}

export default useAddDeals;