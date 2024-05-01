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
    pcategory: {
        name: 'pcategory',
        id: 'pcategory',
        placeholder: 'Select category',
        type: 'select',
        label: "Product Category",
        value: '',
        options: [],
        validation: [
            {
                required: true,
                alert: "Product Category is required"
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
    preprice: {
        name: 'preprice',
        id: 'preprice',
        placeholder: 'Product Preprice',
        type: 'number',
        label: "Product Pre-Price",
        value: '',
        validation: [
            {
                required: false,
                alert: "Product price is required"
            }
        ]
    },
    discount: {
        name: 'discount',
        id: 'discount',
        placeholder: 'Product discount',
        type: 'number',
        label: "Product Discount",
        value: '',
        validation: [
            {
                required: false,
                alert: "Product discount is required"
            }
        ]
    },
    coupon: {
        name: 'coupon',
        id: 'coupon',
        placeholder: 'Product coupon',
        type: 'text',
        label: "Product Coupon",
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
        label: "Deal Type",
        value: '',
        options: [{ value: 'Today', label: 'Today' }, { value: 'Deals', label: 'Deals' }],
        validation: [
            {
                required: false,
                alert: ""
            }
        ]
    },
    dealstatus: {
        name: 'dealstatus',
        id: 'dealstatus',
        placeholder: 'Deal status',
        type: 'select',
        label: "Deal Status",
        value: '',
        options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }],
        validation: [
            {
                required: false,
                alert: ""
            }
        ]
    },
    preview: {
        name: 'preview',
        id: 'preview',
        placeholder: 'Product review Star',
        type: 'select',
        label: "Product Review Star",
        value: '',
        options: [{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }, { value: 4, label: 4 }, { value: 5, label: 5 }],
        validation: [
            {
                required: false,
                alert: ""
            }
        ]
    },
    ptimeframe: {
        name: 'ptimeframe',
        id: 'ptimeframe',
        placeholder: 'Product time',
        type: 'select',
        label: "Product Timeframe",
        value: '',
        options: [{ value: 'Limited time deal', label: 'Limited time deal' }, { value: 'Normal', label: 'Normal' }],
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
        label: "Product Image",
        value: '',
        imageObject: '',
        validation: [
            {
                required: true,
                alert: "Product image is required"
            }
        ]
    },
    pshortdetails: {
        name: 'pshortdetails',
        id: 'pshortdetails',
        placeholder: 'Short details',
        type: 'text',
        label: "Product Short Details",
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