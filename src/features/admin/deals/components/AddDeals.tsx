
import { useEffect, useState } from "react";
import FormContainer from "../../../../components/ui/FormContainer";
import Modal from "../../../../components/ui/Modal";
import AddDealsModel from "../../../../model/AddDealsModel";
import { VoidFun } from "../../../../utils/Types";
import useAddDeals from "../hooks/useAddDeals";

type Props = {
    onCancel: VoidFun
}

const AddDeals = ({ onCancel }: Props) => {
    const [state, onChange, onChangeEditor, onSubmit, getCategory] = useAddDeals(AddDealsModel);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getCategory();
    }, [])

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoader(true);
        await onSubmit();
        setLoader(false);

        const formElement = event.target as HTMLFormElement;
        if (formElement && typeof formElement.reset === 'function') {
            formElement.reset();
        }
    };

    return (
        <>
            <Modal title="Add deals" onClick={onCancel}>
                <form className="p-4 md:p-5" onSubmit={(event) => onFormSubmit(event)}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <FormContainer state={state} onChange={onChange} onChangeEditor={onChangeEditor} />
                    </div>
                    <img src={state.pimage.imageObject as string} />

                    <div className="grid gap-4 grid-cols-2 mt-4">
                        <div className="col-span-2 sm:col-span-1">
                            <button type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {loader ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>Loading...</> : 'Add new product'}

                            </button>
                            <button type="button"
                                onClick={() => onCancel()} className="ml-2 text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
};

export default AddDeals;