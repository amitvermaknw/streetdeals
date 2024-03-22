import { AddDeals } from "../../utils/Types";
import Input from "./Input";

type T = {
    elements: Array<AddDeals>
}

const buildForm = (formElement: T) => {
    return formElement.elements.map((form: AddDeals, index: number) => {
        switch (form.type) {
            case 'text':
                return (
                    <div className="col-span-2 sm:col-span-2" key={index}>
                        <Input {...form} />
                    </div>
                );
            case 'number':
                return <div className="col-span-2 sm:col-span-1" key={index}>
                    <Input {...form} />
                </div>
        }
    })
}


const FormContainer = (props: T) => {
    return (<>
        {props.elements.length ? buildForm(props).map(item => item) : ''}
    </>)
}

export default FormContainer;