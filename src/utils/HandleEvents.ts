import { AddDeals, EventType } from "./Types";

//event: React.ChangeEvent<HTMLInputElement>
type T = EventType & { type: string }

export const onChange = (action: T, state: AddDeals): AddDeals => {
    if (action.event?.target.name && action.event?.target.type !== 'file') {
        const ele = state[action.event.target.name as keyof typeof state];
        ele.value = action.event.target.value
    } else {
        if (action.event?.target.files && action.event?.target.files[0]) {
            const img = action.event.target.files[0];
            const ele = state[action.event.target.name as keyof typeof state];
            ele.imageObject = URL.createObjectURL(img)
        }
    }
    return { ...state }
}

export const onEditorChange = (action: T, state: AddDeals): AddDeals => {
    console.log(action)
    // const ele = state[action.event.target.name as keyof typeof state];
    // ele.value = action.event.target.value
    return { ...state }
}