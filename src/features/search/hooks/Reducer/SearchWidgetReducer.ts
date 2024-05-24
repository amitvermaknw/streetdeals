import { ON_CHANGE } from "../../../../utils/Constants";
import { onChange } from "../../../../utils/HandleEvents";
import { EventType } from "../../../../utils/Types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = EventType & { type: string, payload?: { content: string | boolean | number }, data?: any }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchWidgetReducer = (state: any, action: T) => {
    const newState = state
    switch (action.type) {
        case ON_CHANGE:
            return onChange(action, newState);
        default:
            return newState;
    }
};

export default SearchWidgetReducer;