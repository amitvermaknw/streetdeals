import FormContainer from "../../../../components/ui/FormContainer";
import Modal from "../../../../components/ui/Modal";
import AddDealsModel from "../../../../model/AddDeals";
import { AddDeals } from "../../../../utils/Types";
import useAddDeals from "../hooks/useAddDeals";

const AddDeals = () => {

    const [state, onChange] = useAddDeals(AddDealsModel)
    return (
        <>
            <Modal title="Add deals">
                <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <FormContainer state={state} onChange={onChange} />
                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add new product
                    </button>
                </form>
            </Modal>
        </>
    )
};

export default AddDeals;