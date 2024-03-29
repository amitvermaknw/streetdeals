import React from "react";
export interface InputInterfaceProps {
    value?: string | number;
    placeholder: string;
    type: string;
    for?: string;
    name: string;
    label?: string;
    id?: string | number | undefined;
    options?: Array<{ value: string, label: string }>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement> | any
}