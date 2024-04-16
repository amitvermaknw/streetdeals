//import { Reducer } from "react";
import { FORM_SUMBIT, ON_CHANGE, ON_EDITOR_CHANGE } from "../../../../../utils/Constants";
import { onChange, onEditorChange } from "../../../../../utils/HandleEvents";
import { EventType } from "../../../../../utils/Types";

type T = EventType & { type: string, payload?: { content: string | boolean | number } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddDealsReducer = (state: any, action: T): any => {
    const newState = { ...state }
    switch (action.type) {
        case ON_CHANGE:
            return onChange(action, newState);
        case ON_EDITOR_CHANGE:
            return onEditorChange(action, newState);
        case FORM_SUMBIT:
            if (action.payload?.content === true) {
                for (const [key] of Object.entries(newState)) {
                    newState[key].value = ''
                    if (newState[key].type === 'file') {
                        newState[key].imageObject = ''
                        newState[key].image = ''
                    }
                }
            }
            return { ...newState, onSubmit: action.payload?.content }
        default:
            return newState
    }
};

export default AddDealsReducer