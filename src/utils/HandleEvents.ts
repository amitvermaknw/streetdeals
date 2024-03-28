import { AddDeals, EventType } from "./Types";

//event: React.ChangeEvent<HTMLInputElement>
type T = EventType & { type: string }

export const onChange = (action: T, state: AddDeals): AddDeals => {
    if (action.event?.target.name) {
        const ele = state[action.event.target.name as keyof typeof state];
        ele.value = action.event.target.value
    }

    return { ...state }
}