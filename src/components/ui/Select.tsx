import { InputInterfaceProps } from '../../utils/Interface'

const options = (val: Array<{ value?: string, label?: string }>) => {
    if (val?.length) {
        return val.map((item, index) => {
            return <option value={item.value} key={`${index}_${item.value}`}>{item.label}</option>
        })
    }
    return
}

const Select = (props: InputInterfaceProps) => {
    const opt = props.options || []
    return (
        <>
            <label htmlFor={props.for} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{props.label}</label>
            <select name={props.name}
                onChange={props.onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="select">Please select</option>
                {options(opt) ? options(opt)?.map(item => item) : ''}
            </select>
        </>
    )
}

export default Select