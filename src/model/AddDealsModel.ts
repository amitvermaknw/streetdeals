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
        type: 'text',
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
    dealtype: {
        name: 'dealtype',
        id: 'dealtype',
        placeholder: 'Deal Type',
        type: 'select',
        label: "Deal type",
        value: '',
        options: [{ value: 'today', label: 'Today' }, { value: 'deals', label: 'Deals' }],
        validation: [
            {
                required: false,
                alert: ""
            }
        ]
    },
    pimage: {
        name: 'pimage',
        id: 'pimage',
        placeholder: 'Product image',
        type: 'file',
        label: "Product Details",
        value: '',
        imageObject: '',
        validation: [
            {
                required: true,
                alert: "Product image is required"
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