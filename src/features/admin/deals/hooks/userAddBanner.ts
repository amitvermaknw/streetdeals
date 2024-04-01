import React, { useReducer } from "react";
import AddDealsReducer from "./reducer/AddDealsReducer";
import { AddBanner } from "../../../../utils/Types";
import { ON_CHANGE } from "../../../../utils/Constants";

const useAddBanner = (initState: AddBanner) => {

    const [state, dispatch] = useReducer(AddDealsReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    const onSubmit = () => {
        console.log(state);
    }

    return [state, onChange, onSubmit] as const
}

export default useAddBanner;