import { ON_CHANGE } from "../../../utils/Constants";
import { SearchWidgetProps } from "../../../utils/Types";
import React, { useReducer } from "react";
import SearchWidgetReducer from "./Reducer/SearchWidgetReducer";

const useSearchWidget = (initState: SearchWidgetProps) => {
    const [state, dispatch] = useReducer(SearchWidgetReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    return [state, onChange]
}

export default useSearchWidget