import React from 'react';

interface ButtonProps {
    name: string;
    onClick(): void;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-4"
            onClick={props.onClick}
            type="submit"
        >
            {props.name}
        </button>

    )
}

const diff = (preState: ButtonProps, newState: ButtonProps) => {
    if (preState.name !== newState.name) {
        return true;
    }
    return false;
}

export default React.memo(Button, diff);
