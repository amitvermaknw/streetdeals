//import { Reducer } from "react";
import { ON_CHANGE, ON_EDITOR_CHANGE } from "../../../../../utils/Constants";
import { onChange, onEditorChange } from "../../../../../utils/HandleEvents";
import { AddDeals, EventType } from "../../../../../utils/Types";

type T = EventType & { type: string, payload?: object }

const AddDealsReducer = (state: AddDeals, action: T): AddDeals => {
    const newState = { ...state }
    switch (action.type) {
        case ON_CHANGE:
            return onChange(action, newState);
        case ON_EDITOR_CHANGE:
            return onEditorChange(action, newState);
        default:
            return newState
    }
};

export default AddDealsReducer