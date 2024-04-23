import React, { useReducer } from "react";
import { fetchSingleDeal } from "../services/fetchDealsService";
import { GET_SINGLE_DEALS, ON_CHANGE, ON_EDITOR_CHANGE } from "../../../../utils/Constants";
import GetDealsReducer from "./reducer/GetDealsReducer";
import { AddDeals } from "../../../../utils/Types";
import AddDealsReducer from "./reducer/AddDealsReducer";

const useEditDeals = (initState: AddDeals) => {

    const [state, dispatch] = useReducer(GetDealsReducer, initState);
    const [dealState, stateDispatch] = useReducer(AddDealsReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        stateDispatch({ type: ON_CHANGE, event });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChangeEditor = (content: string) => {
        stateDispatch({ type: ON_EDITOR_CHANGE, payload: { content: content } });
    }

    const getSingleDeal = async (pid: string) => {
        const result = await fetchSingleDeal(pid);
        dispatch({ type: GET_SINGLE_DEALS, content: result![0] })
    }

    const onUpdateDeals = async () => {
        console.log(dealState);
    }

    return [state, dealState, onChange, onChangeEditor, getSingleDeal, onUpdateDeals];
}

export default useEditDeals;