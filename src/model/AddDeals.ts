//import { onChange } from "../utils/HandleEvents"

const AddDealsModel = {
    pname: {
        name: 'pname',
        id: 'pname',
        placeholder: 'Type product name',
        type: 'text',
        label: "Product Name",
        value: '',
        validation: [
            {
                required: true,
                alert: "Product name is required"
            }
        ]
    },
    price: {
        name: 'price',
        id: 'price',
        placeholder: 'Product price',
        type: 'number',
        label: "Product Price",
        value: '',
        validation: [
            {
                required: true,
                alert: "Product price is required"
            }
        ]
    },
    coupon: {
        name: 'coupon',
        id: 'coupon',
        placeholder: 'Product coupon',
        type: 'number',
        label: "Product coupon",
        value: '',
        validation: [
            {
                required: false,
                alert: ""
            }
        ]
    },
    producturl: {
        name: 'producturl',
        id: 'producturl',
        placeholder: 'Product URL',
        type: 'text',
        label: "Product URL",
        value: '',
        validation: [
            {
                required: true,
                alert: "Product URL is required"
            }
        ]
    },
    productdetails: {
        name: 'productdetails',
        id: 'productdetails',
        placeholder: 'Product details',
        type: 'texteditor',
        label: "Product Details",
        value: '',
        validation: [
            {
                required: true,
                alert: "Product URL is required"
            }
        ]
    }

}

export default AddDealsModel