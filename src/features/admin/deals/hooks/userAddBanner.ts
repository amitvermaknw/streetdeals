import React, { useCallback, useReducer } from "react";
import AddDealsReducer from "./reducer/AddDealsReducer";
import { AddBanner } from "../../../../utils/Types";
import { FORM_SUMBIT, ON_CHANGE } from "../../../../utils/Constants";
import { addBannerService } from "../services/addBannerService";

const useAddBanner = (initState: AddBanner) => {

    const [state, dispatch] = useReducer(AddDealsReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    const onSubmit = useCallback(async () => {
        const response = await addBannerService(state, 'add');
        dispatch({ type: FORM_SUMBIT, payload: { content: response as boolean } });

    }, [])

    return [state, onChange, onSubmit] as const
}

export default useAddBanner;