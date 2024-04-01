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
    broducturl: {
        name: 'broducturl',
        id: 'broducturl',
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