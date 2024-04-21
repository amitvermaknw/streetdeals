import { GET_DEALS } from "../../../../../utils/Constants"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetDealsReducer = (state: any, action: any) => {
    switch (action.type) {
        case GET_DEALS:
            return [...action.content]
    }
}

export default GetDealsReducer;