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
    },
    {
        name: 'price',
        id: 'price',
        placeholder: 'Product price',
        type: 'number',
        label: "Product Price",
        onChange: onChange,
        validation: [
            {
                required: true,
                msg: "Product price is required"
            }
        ]
    }
]

export default AddDealsModel