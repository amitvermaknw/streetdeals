import { AddDeals } from "../../utils/Types";
import Input from "./Input";
import TextEditor from "./TextEditor";

type Props = {
    state: AddDeals,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const buildForm = (formElement: Props) => {
    return Object.entries(formElement.state).map(([key, form], index: number) => {
        switch (form.type) {
            case 'text':
                return (
                    <div className="col-span-2 sm:col-span-2" key={`${key}_${index}`}>
                        <Input {...form} />
                    </div>
                );
            case 'number':
                return <div className="col-span-2 sm:col-span-1" key={`${key}_${index}`}>
                    <Input {...form} />
                </div>
            case 'texteditor':
                return <div className="col-span-2 sm:col-span-2" key={`${key}_${index}`}>
                    <TextEditor {...form} />
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