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
    onChange: React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement> | any;
    alert?: string;
    isDisabled?: boolean;
}

export interface SelectInputInterfaceProps {
    value: { value: string, label: string };
    placeholder: string;
    type: string;
    for?: string;
    name: string;
    label?: string;
    id?: string | number | undefined;
    options?: Array<{ value: string, label: string }>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement> | any;
    alert?: string;
}

export interface DealsReview {
    comId: string,
    uId: string,
    userName: string,
    startDate?: Date,
    comments: string,
    dealsId: string,
    helpful?: number,
    joinedOn?: string,
    photoUrl?: string,
}