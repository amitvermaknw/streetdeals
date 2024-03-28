import React, { useReducer } from "react";
import AddDealsReducer from "./reducer/AddDealsReducer";
import { AddDeals } from "../../../../utils/Types";
import { ON_CHANGE } from "../../../../utils/Constants";

const useAddDeals = (initState: AddDeals) => {

    const [state, dispatch] = useReducer(AddDealsReducer, initState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
        return;
    };

    return [state, onChange] as const
}

export default useAddDeals;