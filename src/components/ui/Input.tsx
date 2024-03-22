import React from 'react'

interface InputInterfaceProps {
    value?: string | number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange(e: any): void;
    placeholder: string;
    type: string;
    for?: string;
    name: string;
    label?: string;
}

const Input = (props: InputInterfaceProps) => {
    return (
        <>
            <label htmlFor={props.for} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{props.label}</label>
            <input
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type={props.type}
            />
        </>
    )
}

const diff = (prevState: InputInterfaceProps, nextState: InputInterfaceProps): boolean => {
    if (prevState.value !== nextState.value) {
        return false
    }
    return true
}
export default React.memo(Input, diff)