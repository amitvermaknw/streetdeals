import { GET_DEALS } from "../../../../../utils/Constants"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetDealsReducer = (state: any, action: any) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_DEALS:
            return { newState, ...action.content }
    }
}

export default GetDealsReducer;