import { onChange } from "../utils/HandleEvents"

const AddDealsModel = [
    {
        name: 'pname',
        id: 'pname',
        placeholder: 'Type product name',
        type: 'text',
        label: "Product Name",
        onChange: onChange,
        validation: [
            {
                required: true,
                msg: "Product name is required"
            }
        ]
    }
]

export default AddDealsModel