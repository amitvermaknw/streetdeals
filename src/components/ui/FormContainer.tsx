import { AddDeals } from "../../utils/Types";
import BrowseBtn from "./BrowseBtn";
import Input from "./Input";
import Select from "./Select";
import TextEditor from "./TextEditor";

type Props = {
    state: AddDeals,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChangeEditor?: any
}

const buildForm = (formElement: Props) => {
    return Object.entries(formElement.state).map(([key, form], index: number) => {
        switch (form.type) {
            case 'text':
                return (
                    <div className="col-span-2 sm:col-span-2" key={`${key}_${index}`}>
                        <Input {...form} onChange={formElement.onChange} />
                    </div>
                );
            case 'number':
                return <div className="col-span-2 sm:col-span-1" key={`${key}_${index}`}>
                    <Input {...form} onChange={formElement.onChange} />
                </div>
            case 'file':
                return <div className="col-span-2 sm:col-span-2" key={`${key}_${index}`}>
                    <BrowseBtn {...form} onChange={formElement.onChange} />
                </div>
            case 'texteditor':
                return <div className="col-span-2 sm:col-span-2" key={`${key}_${index}`}>
                    <TextEditor {...form} onChangeEditor={formElement.onChangeEditor} onChange={formElement.onChange} />
                </div>
            case 'select':
                return <div className="col-span-2 sm:col-span-2" key={`${key}_${index}`}>
                    <Select {...form} onChange={formElement.onChange} />
                </div>
        }
    })
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContainer = (props: Props) => {
    return (<>
        {typeof props.state === 'object' ? buildForm(props).map(item => item) : ''}
    </>)
}

export default FormContainer;