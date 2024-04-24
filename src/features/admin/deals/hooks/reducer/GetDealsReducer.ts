import { GET_DEALS, GET_SINGLE_DEALS } from "../../../../../utils/Constants"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetDealsReducer = (state: any, action: any) => {
    const new_state = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case GET_DEALS:
            return [
                ...new_state,
                ...action.content
            ]
        case GET_SINGLE_DEALS:
            for (const [key] of Object.entries(new_state)) {
                new_state[key].value = action.content[key] || ''
                if (new_state[key].type === 'file') {
                    new_state[key].imageObject = action.content[key]
                    new_state[key].image = ''
                }
            }
            return { ...new_state }
    }
}

export default GetDealsReducer;