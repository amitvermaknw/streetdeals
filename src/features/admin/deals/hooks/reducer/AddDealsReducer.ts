//import { Reducer } from "react";
import { FORM_SUMBIT, GET_SINGLE_DEALS, ON_CHANGE, ON_EDITOR_CHANGE, UPDATE_ELEMENTS_VALUE } from "../../../../../utils/Constants";
import { onChange, onEditorChange } from "../../../../../utils/HandleEvents";
import { EventType } from "../../../../../utils/Types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = EventType & { type: string, payload?: { content: string | boolean | number }, data?: any }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddDealsReducer = (state: any, action: T): any => {
    //const newState = JSON.parse(JSON.stringify(state))
    const newState = state
    switch (action.type) {
        case ON_CHANGE:
            return onChange(action, newState);
        case ON_EDITOR_CHANGE:
            return onEditorChange(action, newState);
        case FORM_SUMBIT:
            if (action.payload?.content === true) {
                for (const [key] of Object.entries(newState)) {
                    if (key !== 'onSubmit' && key !== 'documentId') {
                        newState[key].value = ''
                        if (newState[key].type === 'file') {
                            newState[key].imageObject = ''
                            newState[key].image = ''
                        }
                    }
                }
            }
            return { ...newState, onSubmit: action.payload?.content }

        case GET_SINGLE_DEALS:

            if (action.data.length) {
                for (const [key] of Object.entries(newState)) {
                    if (key !== 'documentId') {
                        newState[key].value = action.data[0][key] || ''
                        if (newState[key].type === 'file') {
                            newState[key].imageObject = action.data[0]['pimageurl'];
                            newState[key].image = '';
                        }
                    }
                }
                newState.documentId = action.data[1].documentId;
            }

            return { ...newState }

        case UPDATE_ELEMENTS_VALUE:
            for (const [key] of Object.entries(newState)) {
                if (key === 'pcategory') {
                    newState[key].options = action.data
                }
            }
            return { ...newState }

        default:
            return { ...newState }
    }
};

export default AddDealsReducer