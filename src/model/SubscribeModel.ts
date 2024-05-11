//import { onChange } from "../utils/HandleEvents"

const SubscribeModel = {
    semail: {
        name: 'semail',
        id: 'semail',
        placeholder: 'Enter your valid email',
        type: 'text',
        label: "Subscribe for the deals",
        value: '',
        validation: [
            {
                required: true,
                alert: "Email is required"
            }
        ]
    }

}

export default SubscribeModel;