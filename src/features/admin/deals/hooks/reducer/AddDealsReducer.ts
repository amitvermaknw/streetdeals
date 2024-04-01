//import { Reducer } from "react";
import { ON_CHANGE, ON_EDITOR_CHANGE } from "../../../../../utils/Constants";
import { onChange, onEditorChange } from "../../../../../utils/HandleEvents";
import { EventType } from "../../../../../utils/Types";

type T = EventType & { type: string, payload?: { content: string } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddDealsReducer = (state: any, action: T): any => {
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