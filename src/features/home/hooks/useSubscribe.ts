import React, { useReducer } from "react";
import SusbscribeReducer from "./Reducer/SubscriberReduler";
import { ON_CHANGE } from "../../../utils/Constants";
import { SubscriberFormProps } from "../../../utils/Types";
import { addSubscriber } from "../services/subscribeService";

const useSubscribe = (initState: SubscriberFormProps) => {
    const [state, dispatch] = useReducer(SusbscribeReducer, initState);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({ type: ON_CHANGE, event });
    };

    const onSubmit = async () => {
        addSubscriber(state);
        return true;
    }


    return [state, onChange, onSubmit]
}

export default useSubscribe;