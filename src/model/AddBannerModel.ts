//import { onChange } from "../utils/HandleEvents"

const AddBannerModel = {
    bname: {
        name: 'bname',
        id: 'bname',
        placeholder: 'Type Banner name',
        type: 'text',
        label: "Banner Name",
        value: '',
        validation: [
            {
                required: true,
                alert: "Banner name is required"
            }
        ]
    },
    bannerurl: {
        name: 'bannerurl',
        id: 'bannerurl',
        placeholder: 'Banner URL',
        type: 'text',
        label: "Banner URL",
        value: '',
        validation: [
            {
                required: true,
                alert: "Banner URL is required"
            }
        ]
    },
    bstatus: {
        name: 'bstatus',
        id: 'bstatus',
        placeholder: 'Banner status',
        type: 'select',
        label: "Banner status",
        value: '',
        options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }],
        validation: [
            {
                required: false,
                alert: ""
            }
        ]
    },
    bimage: {
        name: 'bimage',
        id: 'bimage',
        placeholder: 'Banner image',
        type: 'file',
        label: "Banner image",
        value: '',
        imageObject: '',
        validation: [
            {
                required: true,
                alert: "Banner image is required"
            }
        ]
    }

}

export default AddBannerModel