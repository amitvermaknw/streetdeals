//import { Reducer } from "react";
import { onChange } from "../../../../../utils/HandleEvents";
import { AddDeals, EventType } from "../../../../../utils/Types";

type T = EventType & { type: string }

const AddDealsReducer = (state: AddDeals, action: T): AddDeals => {
    const newState = { ...state }
    switch (action.type) {
        case 'onchange':
            return onChange(action, newState)
        default:
            return newState
    }
};

export default AddDealsReducer