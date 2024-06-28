import React from 'react';
const Alert = (props: { info?: string, danger?: string, success?: string, warning?: string, dark?: string }) => {
    return (
        <>
            {props.info ? <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Info alert!</span> {props.info}
            </div> : ''}
            {props.danger ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Danger alert!</span> {props.danger}
            </div> : ''}
            {props.success ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">Success alert!</span> {props.success}
            </div> : ''}
            {props.warning ? <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">Warning alert!</span> {props.warning}
            </div> : ''}
            {props.dark ? <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                <span className="font-medium">Dark alert!</span> {props.dark}
            </div> : ''}
        </>

    )
}

export default Alert;