import { GET_DEALS } from "../../utils/Constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommonReducer = (state: any, action: any): Array<any> => {
    const new_state = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_DEALS:
            return [
                ...new_state,
                ...action.content
            ]
        default:
            return new_state

    }
}

export default CommonReducer;