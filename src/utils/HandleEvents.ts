//import { AddBanner, AddDeals, EventType } from "./Types";
import { EventType } from "./Types";

type T = EventType & { type: string, payload?: { content: string | number | boolean } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onChange = (action: T, state: any): any => {
    if (action.event?.target.name && action.event?.target.type !== 'file') {
        const ele = state[action.event.target.name as keyof typeof state];
        ele.value = action.event.target.value
    } else {
        if (action.event?.target.files && action.event?.target.files[0]) {
            const img = action.event.target.files[0];
            const ele = state[action.event.target.name as keyof typeof state];
            ele.imageObject = URL.createObjectURL(img);
            ele.image = img

        }
    }
    return { ...state }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onEditorChange = (action: T, state: any): any => {
    const ele = state['productdetails'];
    ele.value = action.payload?.content as string
    return { ...state }
}