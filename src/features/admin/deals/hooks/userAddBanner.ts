import React, { useCallback, useReducer } from "react";
import AddDealsReducer from "./reducer/AddDealsReducer";
import { AddBanner } from "../../../../utils/Types";
import { FORM_SUMBIT, ON_CHANGE } from "../../../../utils/Constants";
import { addBannerService } from "../services/addBannerService";
import { useNavigate } from "react-router-dom";

const useAddBanner = (initState: AddBanner) => {

    const [state, dispatch] = useReducer(AddDealsReducer, initState);
    const navigate = useNavigate();

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    const onSubmit = useCallback(async () => {
        const response = await addBannerService(state, 'add');
        if (typeof response === 'boolean') {
            dispatch({ type: FORM_SUMBIT, payload: { content: response as boolean } });
        } else if (Object.prototype.hasOwnProperty.call(response, "data")) {
            if (response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login")
            }
        }
    }, [])

    return [state, onChange, onSubmit] as const
}

export default useAddBanner;